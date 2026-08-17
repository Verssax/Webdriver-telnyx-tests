# Telnyx WebdriverIO Test Suite

Cross-browser E2E suite for telnyx.com, built on WebdriverIO + Mocha, with
Allure reporting, Docker, and a GitHub Actions pipeline that publishes the
Allure report to GitHub Pages.

## Project structure

```
.
├── Dockerfile                    # parameterized, works for any browser via build args
├── docker-compose.yml            # chrome-tests / firefox-tests services
├── wdio.conf.js                  # re-exports config/wdio.chrome.conf.js (default entrypoint some tools/IDEs expect at root)
├── config/
│   ├── wdio.shared.conf.js       # config shared by every browser
│   ├── wdio.chrome.conf.js       # chrome capabilities, extends shared config
│   └── wdio.firefox.conf.js      # firefox capabilities
├── .github/workflows/tests.yml   # CI pipeline
└── test/
    ├── pages/                    # page objects
    │   └── components/           # footer, navBar (shared across pages)
    ├── specs/                    # test specs
    ├── testData/                 # JSON fixtures used by page objects/specs
    └── utils/                    # helpers (pickRandom, randomInt, generateUser)
```

## Install

```bash
npm install
```

## Cross-environment config (`cross-env`)

All test scripts use [`cross-env`](https://www.npmjs.com/package/cross-env)
to set `HEADLESS` / `BASE_URL` before WDIO starts, so the same `npm run`
commands work identically on Windows, macOS, and Linux (plain
`VAR=value command` only works in bash/zsh).

`wdio.shared.conf.js` reads:
- `BASE_URL` — defaults to `https://telnyx.com/`
- `HEADLESS` — `'true'` runs headless (CI/Docker default), anything else runs headed (local default)

### `.env`

`wdio.shared.conf.js` loads `.env` automatically via `dotenv`, so anything
you put there overrides the defaults above without editing code or
exporting shell variables:

```bash
cp .env.example .env
```

```
BASE_URL=https://telnyx.com/
HEADLESS=false
```

You only need `.env` if you want a *personal* override (e.g. always run
headed, or point at a staging URL) — `npm test`/`test:chrome`/etc. already
set `HEADLESS`/`BASE_URL` explicitly via `cross-env`, and those take
precedence since the scripts set them right before WDIO starts.

**Yes, keep it in `.gitignore`** (already added). `.env` is for
machine-local overrides and could end up holding real secrets or internal
URLs later — it shouldn't be committed. `.env.example` (committed, no real
values) documents the variable names for anyone cloning the repo; Docker/CI
get their values from `docker-compose.yml` / the workflow file instead, not
from `.env`.

## Running tests

`npm test` runs both browsers via `run-s --continue-on-error` (from
`npm-run-all2`) — Firefox still runs even if Chrome has failing specs; the
overall command exits non-zero at the end if either browser failed.

```bash
npm test              # chrome, then firefox (full suite)
npm run test:chrome   # chrome only
npm run test:firefox  # firefox only

# single spec file:
npm run test:file -- test/specs/main.spec.js
```

## Allure report

Tests write raw results to `allure-results/` (via `@wdio/allure-reporter`,
configured in `wdio.shared.conf.js`). Turn that into a viewable HTML report:

```bash
npm run allure:generate   # -> allure-report/
npm run allure:open       # serves it locally
# or both:
npm run allure:report
```

## Docker

The `Dockerfile` follows WebdriverIO's own
[Docker guide](https://webdriver.io/docs/docker/): it starts `FROM` a
`selenium/standalone-<browser>` image (browser + matching driver already
installed) and just adds Node + the project. The browser/config are build
args, so one Dockerfile covers every browser.

**Locally**, via docker-compose (builds both images and runs both suites,
Allure results land in `./allure-results` on the host):

```bash
npm run docker:all
# or individually
npm run docker:chrome
npm run docker:firefox
```

**Manually**, without compose:

```bash
docker build --build-arg BROWSER_IMAGE=selenium/standalone-chrome:130.0 \
             --build-arg WDIO_CONF=config/wdio.chrome.conf.js \
             -t telnyx-tests-chrome .
docker run --rm -e HEADLESS=true -v "$(pwd)/allure-results:/app/allure-results" telnyx-tests-chrome
```

## CI/CD pipeline (GitHub Actions → GitHub Pages)

`.github/workflows/tests.yml` runs on every push/PR to `main`:

1. **`test` job** (matrix: chrome, firefox) — builds and runs the same
   Docker image used locally, so CI and local runs can never drift apart.
   Allure results are uploaded as artifacts per browser.
2. **`report` job** — downloads and merges both browsers' results, generates
   one combined Allure HTML report, and deploys it to the `gh-pages` branch
   via `peaceiris/actions-gh-pages`.

**One-time repo setup:** after the first successful run creates the
`gh-pages` branch, go to **Settings → Pages** and set the source to the
`gh-pages` branch (root). The report will then be live at:

```
https://<your-github-username>.github.io/<repo-name>/
```

## Troubleshooting

**`Failed downloading firefox vnightly_...` / `end of central directory
record signature not found`**

When a capability doesn't specify `browserVersion` and WDIO can't auto-detect
a matching browser already installed on the machine, its built-in browser
manager downloads one itself — for Firefox that defaults to the large,
frequently-changing **Nightly** build, and on corporate networks the download
often gets truncated/corrupted by a proxy or antivirus (that's the "end of
central directory record signature not found" zip error).

Two independent fixes are already in the configs:
1. Every browser config now pins `browserVersion: 'stable'`, so if a download
   does happen, it fetches the stable channel instead of Nightly.
2. You can skip the browser download entirely by pointing at your own
   installed browser via an env var — set it in `.env` or export it before
   running:
   ```
   FIREFOX_BINARY=C:\Program Files\Mozilla Firefox\firefox.exe
   CHROME_BINARY=C:\Program Files\Google\Chrome\Application\chrome.exe
   ```
   With a binary path set, WDIO only needs to fetch a small matching driver
   (geckodriver/chromedriver), not the whole browser.

**`` `xz` utility is required to unpack this archive `` (inside Docker)**

Same root cause as above, but happening inside the container: even though
the `selenium/standalone-firefox`/`selenium/standalone-chrome` base images
already ship the browser, WDIO doesn't know that and tries to download its
own copy anyway, which then fails to unpack because the image is missing
`xz`. `docker-entrypoint.sh` resolves the browser already installed in the
image at container start and exports it as `FIREFOX_BINARY`/`CHROME_BINARY`
before running the tests, so this download is skipped entirely — just
rebuild the image (`npm run docker:build:firefox` / `docker compose build`)
to pick up the fix.

**`This version of ChromeDriver only supports Chrome version 152` (inside
Docker)**

Caused by pinning `browserVersion: 'stable'` in the capabilities — it tells
WDIO's driver manager to fetch a chromedriver matching whatever "stable"
currently is upstream, ignoring the actual (older, pinned) Chrome version
baked into the `selenium/standalone-chrome:130.0` image. Fixed by removing
that pin; WDIO now detects the real version straight from `CHROME_BINARY`
and fetches a matching driver.

**`Running Firefox as root in a regular user's session is not supported`
(inside Docker)**

Firefox refuses to launch as root, but the Dockerfile runs as root to
install Node/npm. `docker-entrypoint.sh` now chowns `/app` (including a
bind-mounted `./allure-results`) to the image's built-in `seluser`, then
drops to that user before actually running WDIO. One side effect: on Linux
hosts, the `./allure-results` folder on your machine will end up owned by
`seluser`'s uid after a Docker run — harmless (still world-readable, and
it's git-ignored anyway), but if you ever need to delete it manually and hit
a permission error, `sudo rm -rf allure-results` clears it.
