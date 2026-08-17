import 'dotenv/config';

export const config = {
    runner: 'local',


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

    afterTest: async function (test, context, { error }) {
        if (error) {
            await browser.takeScreenshot();
        }
    }
};
