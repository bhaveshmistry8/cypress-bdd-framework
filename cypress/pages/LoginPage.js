class LoginPage {
    // Selectors
    elements = {
        usernameInput: () => cy.get('[data-test="username"]'),
        passwordInput: () => cy.get('[data-test="password"]'),
        loginButton: () => cy.get('[data-test="login-button"]'),
        errorMessage: () => cy.get('[data-test="error"]'),
        logoImage: () => cy.get('.login_logo')
    };

    // Actions
    visit() {
        cy.visit('/');
    }

    verifyPageLoaded() {
        this.elements.logoImage().should('be.visible');
        this.elements.usernameInput().should('be.visible');
    }

    verifyUrl() {
        cy.url().should('include', '/');
    }

    enterUsername(username) {
        this.elements.usernameInput().clear().type(username);
    }

    enterPassword(password) {
        this.elements.passwordInput().clear().type(password);
    }

    clickLogin() {
        this.elements.loginButton().click();
    }

    verifyErrorMessageVisible() {
        this.elements.errorMessage().should('be.visible');
    }

    verifyErrorMessageContains(text) {
        this.elements.errorMessage().should('contain', text);
    }

    // Combined action for quick login
    login(username, password) {
        this.enterUsername(username);
        this.enterPassword(password);
        this.clickLogin();
    }
}

export default LoginPage;