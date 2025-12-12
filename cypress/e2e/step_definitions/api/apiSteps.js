import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

let requestBody = {};

Given('I have the following user data:', (dataTable) => {
    requestBody = dataTable.rowsHash();
});

Given('I have the following registration data:', (dataTable) => {
    requestBody = dataTable.rowsHash();
});

When('I send a GET request to {string}', (endpoint) => {
    cy.request({
        method: 'GET',
        url: `${Cypress.env('apiUrl')}${endpoint}`,
        failOnStatusCode: false
    }).as('response');
});

When('I send a POST request to {string}', (endpoint) => {
    cy.request({
        method: 'POST',
        url: `${Cypress.env('apiUrl')}${endpoint}`,
        body: requestBody,
        failOnStatusCode: false
    }).as('response');
});

When('I send a PUT request to {string}', (endpoint) => {
    cy.request({
        method: 'PUT',
        url: `${Cypress.env('apiUrl')}${endpoint}`,
        body: requestBody,
        failOnStatusCode: false
    }).as('response');
});

When('I send a PATCH request to {string}', (endpoint) => {
    cy.request({
        method: 'PATCH',
        url: `${Cypress.env('apiUrl')}${endpoint}`,
        body: requestBody,
        failOnStatusCode: false
    }).as('response');
});

When('I send a DELETE request to {string}', (endpoint) => {
    cy.request({
        method: 'DELETE',
        url: `${Cypress.env('apiUrl')}${endpoint}`,
        failOnStatusCode: false
    }).as('response');
});

Then('the response status should be {int}', (statusCode) => {
    cy.get('@response').its('status').should('eq', statusCode);
});

Then('the response time should be less than {int}ms', (time) => {
    cy.get('@response').its('duration').should('be.lessThan', time);
});

Then('the response should have property {string}', (property) => {
    cy.get('@response').its('body').should('have.property', property);
});

Then('the data array should not be empty', () => {
    cy.get('@response').its('body').should('be.an', 'array').and('not.be.empty');
});

Then('each user should have the following properties:', (dataTable) => {
    const properties = dataTable.raw().flat();
    cy.get('@response').its('body').then((users) => {
        users.forEach(user => {
            properties.forEach(prop => {
                expect(user).to.have.property(prop);
            });
        });
    });
});

Then('the user email should be valid format', () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    cy.get('@response').its('body.email').should('match', emailRegex);
});

Then('the response {string} should be {string}', (field, value) => {
    cy.get('@response').its(`body.${field}`).should('eq', value);
});