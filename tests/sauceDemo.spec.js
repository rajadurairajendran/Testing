const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage');
const ProductsPage = require('../pages/ProductsPage');

test.describe('Sauce Demo Tests', () => {
    test('should fail login with invalid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce001');
        
        const errorMessage = await loginPage.getErrorMessage();
        expect(errorMessage).toContain('Epic sadface');
    });

    test('should complete purchase flow with valid credentials', async ({ page }) => {
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        
        // Login
        await loginPage.navigate();
        await loginPage.login('standard_user', 'secret_sauce');
        
        // Verify successful login
        const isInventoryVisible = await loginPage.isInventoryPageVisible();
        expect(isInventoryVisible).toBeTruthy();
        
        // Add products to cart
        await productsPage.addFirstTwoProductsToCart();
        
        // Verify cart count
        const cartCount = await productsPage.getCartCount();
        expect(cartCount).toBe('2');
        
        // Proceed to checkout
        await productsPage.goToCart();
        await productsPage.proceedToCheckout();
        
        // Fill checkout information
        await productsPage.fillCheckoutInformation('Raj', 'R', '12345');
        
        // Complete order
        await productsPage.completeOrder();
        
        // Verify order confirmation
        const confirmationMessage = await productsPage.getOrderConfirmationMessage();
        expect(confirmationMessage).toContain('Thank you for your order!');
    });
}); 