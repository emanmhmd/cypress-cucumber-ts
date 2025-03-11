class logoutPage {
    burgerMenuButton() {
        return cy.get('#react-burger-menu-btn');
    }
    logoutButton() {
        return cy.get('[data-test="logout-sidebar-link"]');
    }
}

export default new logoutPage();