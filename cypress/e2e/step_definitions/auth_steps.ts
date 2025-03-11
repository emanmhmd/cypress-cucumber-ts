import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import loginPage from '../../support/pages/loginPage';
import logoutPage from '../../support/pages/logoutPage';
import productsPage from '../../support/pages/productsPage';
import { v4 as uuidv4 } from 'uuid';

Given('You navigate to login page', () => {
    cy.visit("https://www.saucedemo.com/");
});

Given('You navigate to products page', () => {
    cy.visit('https://www.saucedemo.com/inventory.html', { failOnStatusCode: false });
});

When('You type valid credentials of {string}', (userType: string) => {
    cy.fixture('users').then((credentials) => {
        const { username, password } = credentials[userType];
        loginPage.login(username, password);
    });
});

When('You type invalid credentials', () => {
    loginPage.login('invalid_user', 'invalid_password');
});

When('You click on login button', () => {
    loginPage.loginForm.loginButton().click();
});

Then('You should be redirected to products page', () => {
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html');
});

Then('You should be redirected to login page', () => {
    cy.url().should('eq', 'https://www.saucedemo.com/');
});

Then('You should see an error message', () => {
    loginPage.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service');
});

Then('You should see an error message that the user is locked out', () => {
    loginPage.verifyErrorMessage('Epic sadface: Sorry, this user has been locked out.');
});

When('You add the 4th item to the cart', () => {
    productsPage.interceptCartErrorBeforeClick();
    productsPage.products.item4().click();
  });
  
Then('You should see a server side error', () => {
   productsPage.interceptCartError();
});

When('You add an item to the cart', () => {
    productsPage.products.item1().click();
});

When('You click on logout button', () => {
    logoutPage.burgerMenuButton().click();
    logoutPage.logoutButton().click();
});

Then('You should see an error message that you need to login first', () => {
    loginPage.verifyErrorMessage("Epic sadface: You can only access '/inventory.html' when you are logged in.");
});