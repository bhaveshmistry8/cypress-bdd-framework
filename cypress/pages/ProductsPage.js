class ProductsPage {
    // Selectors
    elements = {
        pageTitle: () => cy.get('.title'),
        cartIcon: () => cy.get('.shopping_cart_link'),
        cartBadge: () => cy.get('.shopping_cart_badge'),
        inventoryItems: () => cy.get('.inventory_item'),
        addToCartButton: (productName) => cy.contains('.inventory_item', productName)
            .find('button').contains('Add to cart'),
        removeButton: (productName) => cy.contains('.inventory_item', productName)
            .find('button').contains('Remove'),
        productName: (name) => cy.contains('.inventory_item_name', name)
    };

    // Actions
    visit() {
        cy.visit('/inventory.html');
    }

    verifyUrl() {
        cy.url().should('include', '/inventory.html');
    }

    verifyPageTitle(title) {
        this.elements.pageTitle().should('have.text', title);
    }

    addProductToCart(productName) {
        this.elements.addToCartButton(productName).click();
    }

    removeProductFromCart(productName) {
        this.elements.removeButton(productName).click();
    }

    clickCartIcon() {
        this.elements.cartIcon().click();
    }

    clickProductName(productName) {
        this.elements.productName(productName).click();
    }

    verifyCartBadgeCount(count) {
        this.elements.cartBadge().should('have.text', count.toString());
    }

    verifyCartBadgeNotVisible() {
        this.elements.cartBadge().should('not.exist');
    }

    getProductCount() {
        return this.elements.inventoryItems().its('length');
    }
}

export default ProductsPage;