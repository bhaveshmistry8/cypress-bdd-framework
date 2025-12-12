const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');

module.exports = defineConfig({
    e2e: {
        baseUrl: 'https://www.saucedemo.com',
        specPattern: 'cypress/e2e/features/**/*.feature',
        supportFile: 'cypress/support/e2e.js',
        screenshotsFolder: 'cypress/screenshots',
        videosFolder: 'cypress/videos',
        video: true,
        videoCompression: 32,
        viewportWidth: 1920,
        viewportHeight: 1080,
        defaultCommandTimeout: 10000,
        requestTimeout: 10000,
        responseTimeout: 10000,
        pageLoadTimeout: 60000,
        chromeWebSecurity: false,

        env: {
            apiUrl: 'https://jsonplaceholder.typicode.com',
            environment: 'dev'
        },

        experimentalModifyObstructiveThirdPartyCode: true,

        retries: {
            runMode: 2,
            openMode: 0
        },

        async setupNodeEvents(on, config) {
            await addCucumberPreprocessorPlugin(on, config);

            on(
                'file:preprocessor',
                createBundler({
                    plugins: [createEsbuildPlugin(config)],
                })
            );

            require('cypress-mochawesome-reporter/plugin')(on);

            return config;
        },

        reporter: 'cypress-mochawesome-reporter',
        reporterOptions: {
            reportDir: 'cypress/reports',
            charts: true,
            reportPageTitle: 'Cypress BDD Test Report',
            embeddedScreenshots: true,
            inlineAssets: true,
            saveAllAttempts: false,
            html: true,
            json: true
        }
    }
});