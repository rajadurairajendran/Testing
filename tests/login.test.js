const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');

test.describe('Login Tests', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.navigate();
    });

    test('successful login with valid credentials', async () => {
        await loginPage.login('standard_user', 'secret_sauce');
        const isInventoryVisible = await loginPage.isInventoryPageVisible();
        expect(isInventoryVisible).toBeTruthy();
    });

    test('failed login with invalid credentials', async () => {
        await loginPage.login('invalid_user', 'invalid_password');
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Username and password do not match');
    });
}); 