import productsPage from "./productsPage";
class cartPage {
    checkoutButton (){
        return cy.get('[data-test="checkout"]')
    }
    verifyItemInCart(){
        return cy.get('[data-test="inventory-item"]');
    }
    removeButton(){
        return cy.get('[data-test*="remove-"]');
    }
    verifyItemNotInCart(){
        productsPage.products.item1().should('not.exist');
        cy.get('.removed_cart_item').should('exist');
    }
}

export default new cartPage();