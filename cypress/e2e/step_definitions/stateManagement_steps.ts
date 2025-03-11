import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import productsPage from '../../support/pages/productsPage';
import { v4 as uuidv4 } from 'uuid';
import cartPage from '../../support/pages/cartPage';
import checkoutPage from '../../support/pages/checkoutPage';

Then('You refresh the page', () => {    
    cy.reload();
});

Then('You buy an item by completing checkout process', () => {
    productsPage.products.item1().click();
    productsPage.cartButton().click();
    cartPage.checkoutButton().click();
    cy.fixture('users').then((users) => {
        const { firstName, lastName, zipCode } = users.standard_user;
        checkoutPage.checkoutForm.firstName().type(firstName);
        checkoutPage.checkoutForm.lastName().type(lastName);
        checkoutPage.checkoutForm.postalCode().type(zipCode);
    });
    checkoutPage.checkoutForm.continueButton().click();
    checkoutPage.checkoutForm.finishButton().click();
    checkoutPage.confirmationHeader().should('be.visible');
});

Then('You return to the home page', () => {
   checkoutPage.backToProducts().click();
});

Then('the cart should be empty', () => {
    cartPage.verifyItemInCart().should('not.exist');
});