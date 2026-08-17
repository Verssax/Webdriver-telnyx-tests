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

if (process.env.CHROME_BINARY) {
    chromeOptions.binary = process.env.CHROME_BINARY;
}

export const config = deepmerge(sharedConfig, {
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome',
        'goog:chromeOptions': chromeOptions
    }]
});
