import { Page } from "@playwright/test";

export class CartPage {
    
    baseUrl = 'https://www.saucedemo.com/cart.html'
    locatorCountCart = '[data-test="shopping-cart-link"]'
    locatorClassamount = '.cart_item'
    locatorContinueShopping = '[data-test="continue-shopping"]'
    locatorClassitemname = '.inventory_item_name'
    locatorClassitemprice = '.inventory_item_price'
    locatorRemoveBackpack = '[data-test="remove-sauce-labs-backpack"]'
    locatorRemoveBikelike = '[data-test="remove-sauce-labs-bike-light"]'
    locatorRemoveBoltTshirt = '[data-test="remove-sauce-labs-bolt-t-shirt"]'
    locatorRemoveFleeceJacket = '[data-test="remove-sauce-labs-fleece-jacket"]'
    locatorRemoveOnesie = '[data-test="remove-sauce-labs-onesie"]'
    locatorRemoveRedTshirt = '[data-test="remove-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]'
    locatorCheckout = '[data-test="checkout"]'



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
    async getCountCart() {
        const countCart = await this.page.locator(this.locatorCountCart).textContent()
        return Number(countCart.replace(/\D/g, ''))
    }
    async getClassAmount() {
        return await this.page.locator(this.locatorClassamount).count()
    }
    invalidUrl() {
        // console.log('Current URL:', this.page.url())
        const url = this.page.url()
        // console.log('Base URL:', this.baseUrl)
        // console.log('Is URL valid:', url === this.baseUrl)
        return url === this.baseUrl
    }
    async clickContinueShopping() {
        await this.page.locator(this.locatorContinueShopping).click()
    }
    async getProductNames() {
        return await this.page.$$eval(this.locatorClassitemname, els =>
            els.map(el => el.textContent.trim())
        );
    }
    async getProductPrices() {
        return await this.page.$$eval(this.locatorClassitemprice, els =>
            els.map(el => el.textContent.trim())
        );
    }
    async getProductNamesandPrices() {
        const productNames = await this.page.$$eval(this.locatorClassitemname, els =>
            els.map(el => el.textContent.trim())
        );
        const productPrices = await this.page.$$eval(this.locatorClassitemprice, els =>
            els.map(el => el.textContent.trim())
        );
        return productNames.map((name, index) => {
            return {
                name: name,
                price: productPrices[index]
            }
    })}
    async removeBackpack() {
        await this.page.locator(this.locatorRemoveBackpack).click()
    }
    async removeBikeLight() {
        await this.page.locator(this.locatorRemoveBikelike).click()
    }
    async removeBoltTshirt() {
        await this.page.locator(this.locatorRemoveBoltTshirt).click()
    }
    async removeFleeceJacket() {
        await this.page.locator(this.locatorRemoveFleeceJacket).click()
    }
    async removeOnesie() {
        await this.page.locator(this.locatorRemoveOnesie).click()
    }
    async removeRedTshirt() {
        await this.page.locator(this.locatorRemoveRedTshirt).click()
    }
    async clickCheckout() {
        await this.page.locator(this.locatorCheckout).click()
    }  
    
}

