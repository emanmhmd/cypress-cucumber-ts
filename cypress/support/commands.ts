/// <reference types="cypress" />
import loginPage from "./pages/loginPage";

declare global {
  namespace Cypress {
    interface Chainable {
      loginAsStandardUser(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('loginAsStandardUser', () => {
  cy.visit('https://www.saucedemo.com/');
  cy.fixture('users').then((users) => {
    const { username, password } = users.standard_user;
    loginPage.login(username, password);
    loginPage.loginForm.loginButton().click();
  });
});