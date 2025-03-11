class productsPage {
    public products = {
        item1: () => cy.get('[data-test="add-to-cart-sauce-labs-onesie"]'),
        item2: () => cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]'),
        item3: () => cy.get('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]'),
        item4: () => cy.get('[data-test="add-to-cart-sauce-labs-fleece-jacket"]'),
        item5: () => cy.get('[data-test="add-to-cart-sauce-labs-onesie"]'),
        item6: () => cy.get('[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]'),
    }

    cartButton(){
       return cy.get('[data-test="shopping-cart-link"]')
    }

    public interceptCartErrorBeforeClick() {
        cy.intercept('POST', 'https://submit.backtrace.io/**', (req) => {
              const bodyString = req.body.toString();
              if (bodyString.includes('Failed to add item to the cart')) {
                req.reply({
                  statusCode: 503,
                });
              } else {
                req.continue();
              }
            }).as('cartErrorReport');
          
            cy.on('uncaught:exception', (err) => {
              if (err.message.includes('Failed to add item to the cart')) {
                return false;
              }
              return true;
            });
    }
    public interceptCartError() {
        cy.intercept('POST', 'https://submit.backtrace.io/**', (req) => {
            const bodyString = req.body.toString();
            if (bodyString.includes('Failed to add item to the cart')) {
              req.reply({
                statusCode: 503,
              });
            } else {
              req.continue();
            }
          }).as('cartErrorReport');
          cy.wait('@cartErrorReport').its('response.statusCode').should('eq', 503);
          
    }
}

export default new productsPage();