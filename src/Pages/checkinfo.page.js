import { Page } from "@playwright/test";

export class CheckInfoPage {
    
    baseUrl = 'https://www.saucedemo.com/checkout-step-one.html'
    locatorFirstName = '[data-test="firstName"]'
    locatorLastName = '[data-test="lastName"]'
    locatorZipCode = '[data-test="postalCode"]'
    locatorContinue = '[data-test="continue"]'
    locatorCancel = '[data-test="cancel"]'
    locatorErrorMessage = '[data-test="error"]'
    




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
    async fillFirstName(firstName) {
        await this.page.locator(this.locatorFirstName).fill(firstName)
    }
    async fillLastName(lastName) {
        await this.page.locator(this.locatorLastName).fill(lastName)
    }
    async fillZipCode(zipCode) {
        await this.page.locator(this.locatorZipCode).fill(zipCode)
    }
    async clickContinue() {
        await this.page.locator(this.locatorContinue).click()
    }
    async clickCancel() {
        await this.page.locator(this.locatorCancel).click()
    }
    async getErrorMessage() {
        return await this.page.locator(this.locatorErrorMessage).textContent()
    }
}

