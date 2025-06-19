class ProductsPage {
    constructor(page) {
        this.page = page;
        this.addToCartButtons = '.inventory_item button';
        this.cartIcon = '.shopping_cart_link';
        this.cartCount = '.shopping_cart_badge';
        this.checkoutButton = '#checkout';
        this.firstNameInput = '#first-name';
        this.lastNameInput = '#last-name';
        this.zipCodeInput = '#postal-code';
        this.continueButton = '#continue';
        this.finishButton = '#finish';
        this.orderConfirmation = '.complete-header';
    }

    async addFirstTwoProductsToCart() {
        const buttons = await this.page.$$(this.addToCartButtons);
        await buttons[0].click();
        await buttons[1].click();
    }

    async getCartCount() {
        return await this.page.textContent(this.cartCount);
    }

    async goToCart() {
        await this.page.click(this.cartIcon);
    }

    async proceedToCheckout() {
        await this.page.click(this.checkoutButton);
    }

    async fillCheckoutInformation(firstName, lastName, zipCode) {
        await this.page.fill(this.firstNameInput, firstName);
        await this.page.fill(this.lastNameInput, lastName);
        await this.page.fill(this.zipCodeInput, zipCode);
        await this.page.click(this.continueButton);
    }

    async completeOrder() {
        await this.page.click(this.finishButton);
    }

    async getOrderConfirmationMessage() {
        return await this.page.textContent(this.orderConfirmation);
    }
}

module.exports = ProductsPage; 