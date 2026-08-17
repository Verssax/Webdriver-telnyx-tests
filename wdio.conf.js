// Kept so `wdio run wdio.conf.js`, WebStorm's WDIO plugin, and other tools
// that expect a default config file at the project root keep working.
// The real per-browser configs are config/wdio.chrome.conf.js and
// config/wdio.firefox.conf.js.
export { config } from './config/wdio.chrome.conf.js';
