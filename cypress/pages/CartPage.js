class CartPage {
    // Selectors
    elements = {
        cartItems: () => cy.get('.cart_item'),
        checkoutButton: () => cy.get('[data-test="checkout"]'),
        continueShoppingButton: () => cy.get('[data-test="continue-shopping"]'),
        removeButton: (productName) => cy.contains('.cart_item', productName)
            .find('button').contains('Remove'),
        pageTitle: () => cy.get('.title')
    };

    // Actions
    visit() {
        cy.visit('/cart.html');
    }

    verifyUrl() {
        cy.url().should('include', '/cart.html');
    }

    clickCheckout() {
        this.elements.checkoutButton().click();
    }

    clickContinueShopping() {
        this.elements.continueShoppingButton().click();
    }

    removeProduct(productName) {
        this.elements.removeButton(productName).click();
    }

    verifyPageTitle(title) {
        this.elements.pageTitle().should('have.text', title);
    }

    getCartItemsCount() {
        return this.elements.cartItems().its('length');
    }

    verifyProductInCart(productName) {
        cy.contains('.cart_item', productName).should('exist');
    }
}

export default CartPage;