import { Page } from "@playwright/test";

export class CheckOutCompletePage {
    
    baseUrl = 'https://www.saucedemo.com/checkout-complete.html'





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
    async getHeaderText() {
        return await this.page.locator('[data-test="complete-header"]').innerText()
    }
    async getCompleteText() {
        return await this.page.locator('[data-test="complete-text"]').innerText()
    }
    async clickBackHome() {
        await this.page.locator('[data-test="back-to-products"]').click()
    }
}

