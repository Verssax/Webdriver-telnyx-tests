import 'dotenv/config';

// Shared config — holds everything that is the SAME across every browser.
// Each wdio.<browser>.conf.js file deep-merges its own `capabilities` (and
// any browser-specific tweaks) on top of this.
export const config = {
    runner: 'local',

    // Relative to THIS file's location (config/), not the project root.
    specs: [
        '../test/specs/**/*.spec.js'
    ],
    exclude: [],

    maxInstances: 10,
    logLevel: 'warn',
    bail: 0,


    baseUrl: process.env.BASE_URL || 'https://telnyx.com/',

    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,

    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },

    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: false,
            disableWebdriverScreenshotsReporting: false,
            useCucumberStepReporter: false,
            addConsoleLogs: true
        }]
    ],

    before: async function () {
        await browser.setWindowSize(1920, 1080);
    },

    // Attach a screenshot to the Allure report whenever a test fails.
    afterTest: async function (test, context, { error }) {
        if (error) {
            await browser.takeScreenshot();
        }
    }
};
