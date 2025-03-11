class checkoutPage {
    public readonly checkoutForm = {
        firstName: () => cy.get('[data-test="firstName"]'),
        lastName: () => cy.get('[data-test="lastName"]'),
        postalCode: () => cy.get('[data-test="postalCode"]'),
        continueButton: () => cy.get('[data-test="continue"]'),
        finishButton: () => cy.get('[data-test="finish"]'),
    }
    confirmationHeader(){
        return cy.get('[data-test="complete-header"]');
    }
    errorsOfRequiredFields(){
        return cy.get('[data-test="error"]');
    }
    backToProducts(){
        return cy.get('[data-test="back-to-products"]');
    }
}

export default new checkoutPage();