class loginPage {
    public readonly loginForm = {
        emailInput: () => cy.get('[data-test="username"]'),
        passwordInput: () => cy.get('[data-test="password"]'),
        errorMessage: () => cy.get('[data-test="error"]'),
        loginButton: () => cy.get('[data-test="login-button"]'),
    }

    public login(username: string, password: string) {
        this.loginForm.emailInput().type(username);
        this.loginForm.passwordInput().type(password);
        // this.loginForm.loginButton().click();
    }

    public verifyErrorMessage(expectedMessage: string) {
        this.loginForm.errorMessage().should('have.text', expectedMessage);
    }
}

export default new loginPage();