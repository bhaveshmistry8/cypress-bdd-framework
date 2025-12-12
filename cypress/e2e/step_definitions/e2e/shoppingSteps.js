import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import ProductsPage from '../../../pages/ProductsPage';
import CartPage from '../../../pages/CartPage';
import CheckoutPage from '../../../pages/CheckoutPage';

const productsPage = new ProductsPage();
const cartPage = new CartPage();
const checkoutPage = new CheckoutPage();

Given('I am logged in as a standard user', () => {
    cy.login('standard_user', 'secret_sauce');
});

Given('I am on the products page', () => {
    // After login, we're already on products page, just verify
    productsPage.verifyUrl();
});

When('I add {string} to the cart', (productName) => {
    productsPage.addProductToCart(productName);
});

When('I add the following products to cart:', (dataTable) => {
    const products = dataTable.raw().flat();
    products.forEach(product => {
        productsPage.addProductToCart(product);
    });
});

When('I remove {string} from the cart', (productName) => {
    productsPage.removeProductFromCart(productName);
});

When('I click on the cart icon', () => {
    productsPage.clickCartIcon();
});

When('I navigate to the product details of {string}', (productName) => {
    productsPage.clickProductName(productName);
});

When('I click the checkout button', () => {
    cartPage.clickCheckout();
});

When('I enter checkout information:', (dataTable) => {
    const data = dataTable.rowsHash();
    checkoutPage.fillCheckoutInformation(data.firstName, data.lastName, data.zipCode);
});

When('I click continue', () => {
    checkoutPage.clickContinue();
});

When('I click finish', () => {
    checkoutPage.clickFinish();
});

Then('the cart badge should show {int} item(s)', (count) => {
    productsPage.verifyCartBadgeCount(count);
});

Then('the cart badge should not be visible', () => {
    productsPage.verifyCartBadgeNotVisible();
});

Then('the cart badge should still show {int} item(s)', (count) => {
    productsPage.verifyCartBadgeCount(count);
});

Then('the product should have a {string} button', (buttonText) => {
    cy.contains('button', buttonText).should('be.visible');
});

Then('the product should have an {string} button', (buttonText) => {
    cy.contains('button', buttonText).should('be.visible');
});

Then('I should be on the cart page', () => {
    cartPage.verifyUrl();
});

Then('I should see the checkout overview', () => {
    checkoutPage.verifyOverviewPage();
});

Then('I should see the order confirmation', () => {
    checkoutPage.verifyConfirmationPage();
});

Then('the confirmation message should contain {string}', (text) => {
    checkoutPage.verifyConfirmationMessage(text);
});