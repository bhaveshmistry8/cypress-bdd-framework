// ***********************************************
// Custom commands for reusable functionality
// ***********************************************

/**
 * Login command for quick authentication
 * @example cy.login('standard_user', 'secret_sauce')
 */
Cypress.Commands.add('login', (username, password) => {
    cy.visit('/');
    cy.get('[data-test="username"]').type(username);
    cy.get('[data-test="password"]').type(password);
    cy.get('[data-test="login-button"]').click();
    cy.url().should('include', '/inventory.html');
});

/**
 * API request command with better error handling
 * @example cy.api({ method: 'GET', url: '/users' })
 */
Cypress.Commands.add('api', (options) => {
    const defaults = {
        failOnStatusCode: false,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    return cy.request({ ...defaults, ...options }).then((response) => {
        // Log API call details
        cy.log(`API ${options.method} ${options.url}`);
        cy.log(`Status: ${response.status}`);
        return response;
    });
});

/**
 * Wait for page to be fully loaded
 */
Cypress.Commands.add('waitForPageLoad', () => {
    cy.window().should('have.property', 'document');
    cy.document().should('have.property', 'readyState', 'complete');
});

/**
 * Clear all cookies and local storage
 */
Cypress.Commands.add('clearAppData', () => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
        win.sessionStorage.clear();
    });
});

/**
 * Take a screenshot with timestamp
 */
Cypress.Commands.add('screenshotWithTimestamp', (name) => {
    const timestamp = new Date().toISOString().replace(/:/g, '-');
    cy.screenshot(`${name}_${timestamp}`);
});

/**
 * Verify element contains text (case insensitive)
 */
Cypress.Commands.add('containsTextIgnoreCase', { prevSubject: true }, (subject, text) => {
    cy.wrap(subject).invoke('text').then((elementText) => {
        expect(elementText.toLowerCase()).to.include(text.toLowerCase());
    });
});

/**
 * API command to validate JSON schema
 */
Cypress.Commands.add('validateSchema', (response, expectedProperties) => {
    expectedProperties.forEach(prop => {
        expect(response.body).to.have.property(prop);
    });
});

/**
 * Retry an action until it succeeds or times out
 */
Cypress.Commands.add('retryUntil', (checkFunction, maxAttempts = 10, delay = 1000) => {
    let attempts = 0;

    function attempt() {
        attempts++;
        try {
            checkFunction();
        } catch (error) {
            if (attempts < maxAttempts) {
                cy.wait(delay);
                attempt();
            } else {
                throw error;
            }
        }
    }

    attempt();
});