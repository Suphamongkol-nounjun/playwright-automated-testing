import { Page } from "@playwright/test";
import { removeSlashUrl } from "../utils";

export class LoginPage {


    baseUrl = 'https://www.saucedemo.com'
    locatorUsername = '#user-name'
    locatorPassword = '#password'
    locatorLoginButton = '#login-button'
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
    
    async fillUserPassword(username, password) {
        await this.page.locator(this.locatorUsername).fill(username)
        await this.page.locator(this.locatorPassword).fill(password)
    }
    
    async clickLoginButton() {
        await this.page.click(this.locatorLoginButton)
    }

    async getUsernameValue() {
        return await this.page.locator(this.locatorUsername).inputValue()
    }

    async getPasswordValue() {
        return await this.page.locator(this.locatorPassword).inputValue()
    }
    async getErrorMessage() {
        try {
            return await this.page.locator(this.locatorErrorMessage).textContent() || "" 
        } catch (error) {
            console.log('Error getting zerror message:', error)
            return null
        }
        
    }
    invalidUrl() {
        const url = removeSlashUrl(this.page.url())
        return url === this.baseUrl
        // console.log(url, this.baseUrl);
        // console.log(url === this.baseUrl);
    }
}