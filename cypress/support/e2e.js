// ***********************************************************
// This file is processed and loaded automatically before test files.
// ***********************************************************

// Import commands.js
import './commands';
import 'cypress-mochawesome-reporter/register';

// Global before hook
before(() => {
    cy.log('Starting test suite execution');
});

// Global after hook
after(() => {
    cy.log('Test suite execution completed');
});

// Before each test
beforeEach(function () {
    // Only clear data if not using session
    if (!this.currentTest.title.includes('logged in')) {
        cy.clearCookies();
        cy.clearLocalStorage();
    }
});

// Handle uncaught exceptions to prevent test failures
Cypress.on('uncaught:exception', (err, runnable) => {
    // Ignore specific errors that don't affect test execution
    if (err.message.includes('ResizeObserver') ||
        err.message.includes('Script error')) {
        return false;
    }
    return true;
});