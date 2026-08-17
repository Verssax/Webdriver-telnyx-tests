import deepmerge from 'deepmerge';
import { config as sharedConfig } from './wdio.shared.conf.js';

const isHeadless = process.env.HEADLESS === 'true';

const args = ['-width=1920', '-height=1080'];
if (isHeadless) args.push('-headless');

const firefoxOptions = { args };


if (process.env.FIREFOX_BINARY) {
    firefoxOptions.binary = process.env.FIREFOX_BINARY;
}

export const config = deepmerge(sharedConfig, {
    capabilities: [{
        maxInstances: 5,
        browserName: 'firefox',

        browserVersion: 'stable',
        'moz:firefoxOptions': firefoxOptions
    }]
});
