import { Page } from "@playwright/test";

export class CheckOutOverViewPage {
    
    baseUrl = 'https://www.saucedemo.com/checkout-step-two.html'





    /**
     * 
     * @param {Page} page 
     */
    constructor(page) {
        this.page = page
    }

    async goto() {
       await this.page.goto(this.baseUrl)
    }
    invalidUrl() {
        // console.log('Current URL:', this.page.url())
        const url = this.page.url()
        // console.log('Base URL:', this.baseUrl)
        // console.log('Is URL valid:', url === this.baseUrl)
        return url === this.baseUrl
    }
    async clickCancelButton() {
        await this.page.locator('[data-test="cancel"]').click()
    }
    async clickFinishButton() {
        await this.page.locator('[data-test="finish"]').click()
    }
    async getTaxArray(itemTotal) {
        return Math.ceil(0.08 * Number(itemTotal) * 100) / 100;
    }
    async getTotalPriceArray(itemTotal, tax) {
        const total = Number(itemTotal) + Number(tax);
        return Number(total.toFixed(2));
    }
    async getTaxfrompage() {
        const taxLabel = await this.page.locator('[data-test="tax-label"]').textContent()
        
        return Number(taxLabel.replace('Tax: $', ''))
    }
    async getTotalPricefrompage() {
        const totalLabel = await this.page.locator('[data-test="subtotal-label"]').textContent()
        return Number(totalLabel.replace('Item total: $', ''))
    }
    async getFinalTotalPricefrompage() {
        const finalTotalLabel = await this.page.locator('[data-test="total-label"]').textContent()
        return Number(finalTotalLabel.replace('Total: $', ''))
    }

}

