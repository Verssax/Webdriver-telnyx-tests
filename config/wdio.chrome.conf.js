import deepmerge from 'deepmerge';
import { config as sharedConfig } from './wdio.shared.conf.js';

const isHeadless = process.env.HEADLESS === 'true';

const args = [
    '--window-size=1920,1080',
    '--disable-infobars',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage'
];
if (isHeadless) args.push('--headless=new');

const chromeOptions = { args };

// Same rationale as the Firefox config: point CHROME_BINARY at an installed
// Chrome to skip WDIO's own browser download if it can't auto-detect one.
if (process.env.CHROME_BINARY) {
    chromeOptions.binary = process.env.CHROME_BINARY;
}

export const config = deepmerge(sharedConfig, {
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome',
        browserVersion: 'stable',
        'goog:chromeOptions': chromeOptions
    }]
});
