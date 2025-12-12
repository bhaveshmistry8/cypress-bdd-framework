class CheckoutPage {
    // Selectors
    elements = {
        firstNameInput: () => cy.get('[data-test="firstName"]'),
        lastNameInput: () => cy.get('[data-test="lastName"]'),
        zipCodeInput: () => cy.get('[data-test="postalCode"]'),
        continueButton: () => cy.get('[data-test="continue"]'),
        finishButton: () => cy.get('[data-test="finish"]'),
        cancelButton: () => cy.get('[data-test="cancel"]'),
        errorMessage: () => cy.get('[data-test="error"]'),
        confirmationHeader: () => cy.get('.complete-header'),
        confirmationText: () => cy.get('.complete-text'),
        pageTitle: () => cy.get('.title')
    };

    // Actions
    fillCheckoutInformation(firstName, lastName, zipCode) {
        this.elements.firstNameInput().clear().type(firstName);
        this.elements.lastNameInput().clear().type(lastName);
        this.elements.zipCodeInput().clear().type(zipCode);
    }

    clickContinue() {
        this.elements.continueButton().click();
    }

    clickFinish() {
        this.elements.finishButton().click();
    }

    clickCancel() {
        this.elements.cancelButton().click();
    }

    verifyOverviewPage() {
        cy.url().should('include', '/checkout-step-two.html');
        this.elements.pageTitle().should('contain', 'Checkout: Overview');
    }

    verifyConfirmationPage() {
        cy.url().should('include', '/checkout-complete.html');
        this.elements.confirmationHeader().should('be.visible');
    }

    verifyConfirmationMessage(text) {
        this.elements.confirmationHeader().should('contain', text);
    }

    verifyErrorMessage(message) {
        this.elements.errorMessage().should('contain', message);
    }
}

export default CheckoutPage;