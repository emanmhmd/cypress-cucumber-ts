import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import productsPage from '../../support/pages/productsPage';
import { v4 as uuidv4 } from 'uuid';
import cartPage from '../../support/pages/cartPage';
import checkoutPage from '../../support/pages/checkoutPage';



Given('You are logged in as "Standard User"', () => {
    cy.loginAsStandardUser();
});

When('You click on the cart button', () => {
    productsPage.cartButton().click();
});

Then('You should see the item in the cart', () => {
    cartPage.verifyItemInCart().should('be.visible');
});

Then('You click on remove button', () => {
    cartPage.removeButton().click();
});

Then('You should see the item removed from the cart', () => {
    cartPage.verifyItemNotInCart();
});

Then('You click on checkout button', () => {
    cartPage.checkoutButton().click();
});

Then('You fill out the checkout form', () => {
    cy.fixture('users').then((users) => {
        const { firstName, lastName, zipCode } = users.standard_user;
        checkoutPage.checkoutForm.firstName().type(firstName);
        checkoutPage.checkoutForm.lastName().type(lastName);
        checkoutPage.checkoutForm.postalCode().type(zipCode);
    });
});

Then('You click on continue button', () => {
    checkoutPage.checkoutForm.continueButton().click();
});

Then('You click on finish button', () => {
    checkoutPage.checkoutForm.finishButton().click();
});

Then('You should see the order confirmation page', () => {
    checkoutPage.confirmationHeader().should('be.visible');
});

Then('You should see an error message {string}', (errorMessage: string) => { 
    checkoutPage.errorsOfRequiredFields().should('contain.text', errorMessage);
});

Then('You leave the first name field empty and enter "User" in the last name field and "12345" in the postal code field', () => {    
    checkoutPage.checkoutForm.lastName().type('User');
    checkoutPage.checkoutForm.postalCode().type('12345');
});

Then('You enter "Standard" in the first name field and leave the last name field empty and enter "12345" in the postal code field', () => {   
    checkoutPage.checkoutForm.firstName().type('Standard');
    checkoutPage.checkoutForm.postalCode().type('12345');
});

Then('You enter "John" in the first name field, "Doe" in the last name field, and leave the postal code field empty', () => {       
    checkoutPage.checkoutForm.firstName().type('John');
    checkoutPage.checkoutForm.lastName().type('Doe');
});
