#!/bin/sh
set -e

FIREFOX_BINARY="$(command -v firefox || true)"
CHROME_BINARY="$(command -v google-chrome || command -v google-chrome-stable || true)"


mkdir -p /app/allure-results
chown -R seluser:seluser /app

exec su -s /bin/sh seluser -c "
    export FIREFOX_BINARY='$FIREFOX_BINARY';
    export CHROME_BINARY='$CHROME_BINARY';
    export HEADLESS='$HEADLESS';
    export BASE_URL='$BASE_URL';
    exec npx wdio run $WDIO_CONF
"
