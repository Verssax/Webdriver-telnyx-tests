import deepmerge from 'deepmerge';
import { config as sharedConfig } from './wdio.shared.conf.js';

// Optional browser — see README for local/CI requirements.
const isHeadless = process.env.HEADLESS === 'true';

const args = [
    '--window-size=1920,1080',
    '--disable-infobars',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage'
];
if (isHeadless) args.push('--headless=new');

const edgeOptions = { args };


if (process.env.EDGE_BINARY) {
    edgeOptions.binary = process.env.EDGE_BINARY;
}

export const config = deepmerge(sharedConfig, {
    capabilities: [{
        maxInstances: 5,
        browserName: 'MicrosoftEdge',
        browserVersion: 'stable',
        'ms:edgeOptions': edgeOptions
    }]
});
