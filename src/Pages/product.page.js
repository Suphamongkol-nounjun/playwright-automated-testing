import { Page } from "@playwright/test";

export class ProductPage {
    
    baseUrl = 'https://www.saucedemo.com/inventory.html'
    locatorAddBackpack = '[data-test="add-to-cart-sauce-labs-backpack"]'
    locatorAddBikelike = '[data-test="add-to-cart-sauce-labs-bike-light"]'
    locatorAddBoltTshirt = '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]'
    locatorAddFleeceJacket = '[data-test="add-to-cart-sauce-labs-fleece-jacket"]'
    locatorAddOnesie = '[data-test="add-to-cart-sauce-labs-onesie"]'
    locatorAddRedTshirt = '[data-test="add-to-cart-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]'
    locatorRemoveBackpack = '[data-test="remove-sauce-labs-backpack"]'
    locatorRemoveBikelike = '[data-test="remove-sauce-labs-bike-light"]'
    locatorRemoveBoltTshirt = '[data-test="remove-sauce-labs-bolt-t-shirt"]'
    locatorRemoveFleeceJacket = '[data-test="remove-sauce-labs-fleece-jacket"]'
    locatorRemoveOnesie = '[data-test="remove-sauce-labs-onesie"]'
    locatorRemoveRedTshirt = '[data-test="remove-test\\.allthethings\\(\\)-t-shirt-\\(red\\)"]'
    locatorCountCart = '[data-test="shopping-cart-link"]'
    locatorBackToProducts = '[data-test="back-to-products"]'
    locatorBackpackProduct = '[data-test="item-4-title-link"]'
    locatorBikeLightProduct = '[data-test="item-0-title-link"]'
    locatorBoltTshirtProduct = '[data-test="item-1-title-link"]'
    locatorFleeceJacketProduct = '[data-test="item-5-title-link"]'
    locatorOnesieProduct = '[data-test="item-2-title-link"]'
    locatorRedTshirtProduct = '[data-test="item-3-title-link"]'
    locatorCartIcon = '[data-test="shopping-cart-link"]'
    locatorClassitemname = '.inventory_item_name'
    locatorClassitemprice = '.inventory_item_price'
    locatorSortContainer = '[data-test="product-sort-container"]'
    locatorProductName = '[data-test="inventory-item-name"]'
    locatorProductPrice = '[data-test="inventory-item-price"]'


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
    async addBackpack() {
        const addToCartButton = this.page.locator(this.locatorAddBackpack);
      
        // หาชื่อและราคาก่อนคลิก เพราะมันอยู่แล้วใน DOM
        const itemContainer = addToCartButton.locator('..').locator('..');
        const itemName = await itemContainer.locator(this.locatorProductName).innerText();
        const itemPrice = await itemContainer.locator(this.locatorProductPrice).innerText();
      
        // คลิก Add to cart
        await addToCartButton.click();
      
        // รอให้ปุ่มเปลี่ยนเป็น Remove
        const removeButton = this.page.locator(this.locatorRemoveBackpack);
        await removeButton.waitFor({ state: 'visible', timeout: 5000 });
      
        return { name: itemName, price: itemPrice };
      }
    async addBikeLight() {
        const addToCartButton = this.page.locator(this.locatorAddBikelike);
      
        // หาชื่อและราคาก่อนคลิก เพราะมันอยู่แล้วใน DOM
        const itemContainer = addToCartButton.locator('..').locator('..');
        const itemName = await itemContainer.locator(this.locatorProductName).innerText();
        const itemPrice = await itemContainer.locator(this.locatorProductPrice).innerText();
      
        // คลิก Add to cart
        await addToCartButton.click();
      
        // รอให้ปุ่มเปลี่ยนเป็น Remove
        const removeButton = this.page.locator(this.locatorRemoveBikelike);
        await removeButton.waitFor({ state: 'visible', timeout: 5000 });
      
        return { name: itemName, price: itemPrice };
    }

    async addBoltTshirt() {
        const addToCartButton = this.page.locator(this.locatorAddBoltTshirt);
      
        // หาชื่อและราคาก่อนคลิก เพราะมันอยู่แล้วใน DOM
        const itemContainer = addToCartButton.locator('..').locator('..');
        const itemName = await itemContainer.locator(this.locatorProductName).innerText();
        const itemPrice = await itemContainer.locator(this.locatorProductPrice).innerText();
      
        // คลิก Add to cart
        await addToCartButton.click();
      
        // รอให้ปุ่มเปลี่ยนเป็น Remove
        const removeButton = this.page.locator(this.locatorRemoveBoltTshirt);
        await removeButton.waitFor({ state: 'visible', timeout: 5000 });
      
        return { name: itemName, price: itemPrice };
    }

    async addFleeceJacket() {
        const addToCartButton = this.page.locator(this.locatorAddFleeceJacket);
      
        // หาชื่อและราคาก่อนคลิก เพราะมันอยู่แล้วใน DOM
        const itemContainer = addToCartButton.locator('..').locator('..');
        const itemName = await itemContainer.locator(this.locatorProductName).innerText();
        const itemPrice = await itemContainer.locator(this.locatorProductPrice).innerText();
      
        // คลิก Add to cart
        await addToCartButton.click();
      
        // รอให้ปุ่มเปลี่ยนเป็น Remove
        const removeButton = this.page.locator(this.locatorRemoveFleeceJacket);
        await removeButton.waitFor({ state: 'visible', timeout: 5000 });
      
        return { name: itemName, price: itemPrice };
        
    }
    async addOnesie() {
        const addToCartButton = this.page.locator(this.locatorAddOnesie);
      
        // หาชื่อและราคาก่อนคลิก เพราะมันอยู่แล้วใน DOM
        const itemContainer = addToCartButton.locator('..').locator('..');
        const itemName = await itemContainer.locator(this.locatorProductName).innerText();
        const itemPrice = await itemContainer.locator(this.locatorProductPrice).innerText();
      
        // คลิก Add to cart
        await addToCartButton.click();
      
        // รอให้ปุ่มเปลี่ยนเป็น Remove
        const removeButton = this.page.locator(this.locatorRemoveOnesie);
        await removeButton.waitFor({ state: 'visible', timeout: 5000 });
      
        return { name: itemName, price: itemPrice };
    }
    async addRedTshirt() {
        const addToCartButton = this.page.locator(this.locatorAddRedTshirt);
      
        // หาชื่อและราคาก่อนคลิก เพราะมันอยู่แล้วใน DOM
        const itemContainer = addToCartButton.locator('..').locator('..');
        const itemName = await itemContainer.locator(this.locatorProductName).innerText();
        const itemPrice = await itemContainer.locator(this.locatorProductPrice).innerText();
      
        // คลิก Add to cart
        await addToCartButton.click();
      
        // รอให้ปุ่มเปลี่ยนเป็น Remove
        const removeButton = this.page.locator(this.locatorRemoveRedTshirt);
        await removeButton.waitFor({ state: 'visible', timeout: 5000 });
      
        return { name: itemName, price: itemPrice };
    }
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
    async getCountCart() {
        return await this.page.locator(this.locatorCountCart).textContent()
    }
    invalidUrl() {
        // console.log('Current URL:', this.page.url())
        const url = this.page.url()
        // console.log('Base URL:', this.baseUrl)
        // console.log('Is URL valid:', url === this.baseUrl)
        return url === this.baseUrl
    }
    async clickBackToProducts() {
        await this.page.locator(this.locatorBackToProducts).click()
    }
    async clickBackpackProduct() {
        await this.page.locator(this.locatorBackpackProduct).click()
    }
    async clickBikeLightProduct() {
        await this.page.locator(this.locatorBikeLightProduct).click()
    }
    async clickBoltTshirtProduct() {
        await this.page.locator(this.locatorBoltTshirtProduct).click()
    }
    async clickFleeceJacketProduct() {
        await this.page.locator(this.locatorFleeceJacketProduct).click()
    }
    async clickOnesieProduct() {
        await this.page.locator(this.locatorOnesieProduct).click()
    }
    async clickRedTshirtProduct() {
        await this.page.locator(this.locatorRedTshirtProduct).click()
    }
    async clickProductSortContainerAZ() {
        await this.page.locator(this.locatorSortContainer).selectOption('az');
    }
    async clickProductSortContainerZA() {
        await this.page.locator(this.locatorSortContainer).selectOption('za');
    }
    async clickProductSortContainerLoHi() {
        await this.page.locator(this.locatorSortContainer).selectOption('lohi');
    }
    async clickProductSortContainerHiLo() {
        await this.page.locator(this.locatorSortContainer).selectOption('hilo');
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
    async sortProductsbyNameAZ(productNames) {
        return productNames.sort((a, b) => a.localeCompare(b));
    }
    async sortProductsbyNameZA(productNames) {
        return productNames.sort((a, b) => b.localeCompare(a));
    }
    async sortProductsbyPriceLowToHigh(productPrices) {
        return productPrices.sort((a, b) => parseFloat(a.replace('$', '')) - parseFloat(b.replace('$', '')));
    }
    async sortProductsbyPriceHighToLow(productPrices) {
        return productPrices.sort((a, b) => parseFloat(b.replace('$', '')) - parseFloat(a.replace('$', '')));
    }
    async clickCartIcon() {
        await this.page.locator(this.locatorCartIcon).click()
    }
    


}

