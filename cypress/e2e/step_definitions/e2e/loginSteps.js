import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import LoginPage from '../../../pages/LoginPage';
import ProductsPage from '../../../pages/ProductsPage';

const loginPage = new LoginPage();
const productsPage = new ProductsPage();

Given('I am on the login page', () => {
    loginPage.visit();
    loginPage.verifyPageLoaded();
});

When('I enter username {string}', (username) => {
    loginPage.enterUsername(username);
});

When('I enter password {string}', (password) => {
    loginPage.enterPassword(password);
});

When('I click the login button', () => {
    loginPage.clickLogin();
});

Then('I should be redirected to the products page', () => {
    productsPage.verifyUrl();
});

Then('I should see the page title {string}', (title) => {
    productsPage.verifyPageTitle(title);
});

Then('I should see an error message', () => {
    loginPage.verifyErrorMessageVisible();
});

Then('I should see an error message containing {string}', (text) => {
    loginPage.verifyErrorMessageContains(text);
});

Then('I should remain on the login page', () => {
    loginPage.verifyUrl();
});

Then('the login result should be {string}', (result) => {
    if (result === 'success') {
        productsPage.verifyUrl();
    } else {
        loginPage.verifyErrorMessageVisible();
    }
});