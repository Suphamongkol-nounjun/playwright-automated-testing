import { expect } from '@playwright/test';
import { test } from "../Pages/base";
import { updateTestResult } from '../utils/updateGoogleSheet';
import { invalidUser, problemUser, validUser } from '../test-data/user';
import { addressUser } from '../test-data/addess';
import { expectArraysToMatchUnordered } from '../utils/checkTwoArray';


test.describe('CHECKOUT OVERVIEW PAGE FUNCTION', () => {
    const { username, password } = validUser[0];
    const { firstName, lastName, zipCode } = addressUser[0];

    test.beforeEach(async ({loginPage}) => {
        await loginPage.goto()
    })
    test('TC-023: The cart badge should displays the correct number of items currently in the cart',async ({loginPage, productPage,cartPage,checkInfoPage,checkoutOverviewPage}) => {
        const testCaseId = 'TC-023'
        try {
            await loginPage.fillUserPassword(username, password);
                await loginPage.clickLoginButton();
                expect(await loginPage.getErrorMessage()).not.toContain('is required')
                expect(loginPage.invalidUrl()).toBe(false);
                expect(productPage.invalidUrl()).toBe(true);

                await productPage.addBackpack();
                expect(await productPage.getCountCart()).toContain('1')
                await productPage.addBikeLight();
                expect(await productPage.getCountCart()).toContain('2')

                await productPage.clickCartIcon()
                expect(cartPage.invalidUrl()).toBe(true);
                expect(await cartPage.getCountCart()).toEqual(await cartPage.getClassAmount())

                await cartPage.clickCheckout()
                expect(checkInfoPage.invalidUrl()).toBe(true);
                await checkInfoPage.fillFirstName(firstName)
                await checkInfoPage.fillLastName(lastName)
                await checkInfoPage.fillZipCode(zipCode)
                
                await checkInfoPage.clickContinue()
                expect(checkoutOverviewPage.invalidUrl()).toBe(true);
                expect(await cartPage.getCountCart()).toEqual(await cartPage.getClassAmount())

                await updateTestResult(testCaseId, 'Pass');
            
        } catch (error) {
            console.log(`Error in test case ${testCaseId}: ${error}`)
            await updateTestResult(testCaseId, 'Fail', error.message)
            
        }




    })
    test('TC-024: The item name and price in the cart should match the selection from the product page',async ({loginPage, productPage,cartPage,checkInfoPage,checkoutOverviewPage}) => {
        const testCaseId = 'TC-024'
        try {
            await loginPage.fillUserPassword(username, password);
                await loginPage.clickLoginButton();
                expect(await loginPage.getErrorMessage()).not.toContain('is required')
                expect(loginPage.invalidUrl()).toBe(false);
                expect(productPage.invalidUrl()).toBe(true);

                const productsArray = [];
                productsArray.push(await productPage.addBackpack());
                expect(await productPage.getCountCart()).toContain('1')
                productsArray.push(await productPage.addBoltTshirt());
                expect(await productPage.getCountCart()).toContain('2')


                await productPage.clickCartIcon()
                expect(cartPage.invalidUrl()).toBe(true);


                await cartPage.clickCheckout()
                expect(checkInfoPage.invalidUrl()).toBe(true);
                await checkInfoPage.fillFirstName(firstName)
                await checkInfoPage.fillLastName(lastName)
                await checkInfoPage.fillZipCode(zipCode)
                
                await checkInfoPage.clickContinue()
                expect(checkoutOverviewPage.invalidUrl()).toBe(true);
               
                const actual = await cartPage.getProductNamesandPrices();

                await expectArraysToMatchUnordered(productsArray, actual)
                await updateTestResult(testCaseId, 'Pass');
            
        } catch (error) {
            console.log(`Error in test case ${testCaseId}: ${error}`)
            await updateTestResult(testCaseId, 'Fail', error.message)
            
        }
    })
    test('TC-025: Should correctly calculate the total, tax, and grand total',async ({loginPage, productPage,cartPage,checkInfoPage,checkoutOverviewPage}) => {
        const testCaseId = 'TC-025'
        try {
            await loginPage.fillUserPassword(username, password);
                await loginPage.clickLoginButton();
                expect(await loginPage.getErrorMessage()).not.toContain('is required')
                expect(loginPage.invalidUrl()).toBe(false);
                expect(productPage.invalidUrl()).toBe(true);

                const productsArray = [];
                productsArray.push(await productPage.addBackpack());
                expect(await productPage.getCountCart()).toContain('1')
                productsArray.push(await productPage.addBoltTshirt());
                expect(await productPage.getCountCart()).toContain('2')

                await productPage.clickCartIcon()
                expect(cartPage.invalidUrl()).toBe(true);


                await cartPage.clickCheckout()
                expect(checkInfoPage.invalidUrl()).toBe(true);
                await checkInfoPage.fillFirstName(firstName)
                await checkInfoPage.fillLastName(lastName)
                await checkInfoPage.fillZipCode(zipCode)
                
                await checkInfoPage.clickContinue()
                expect(checkoutOverviewPage.invalidUrl()).toBe(true);

                const totalPriceArray = await productPage.getPricefromArray(productsArray)
                const tax = await checkoutOverviewPage.getTaxArray(totalPriceArray)
                const finaltotalPricefromArray = await checkoutOverviewPage.getTotalPriceArray(totalPriceArray, tax)

                const taxFromPage = await checkoutOverviewPage.getTaxfrompage()
                const totalFromPage = await checkoutOverviewPage.getTotalPricefrompage()
                const finalTotalFromPage = await checkoutOverviewPage.getFinalTotalPricefrompage()

                expect(tax).toEqual(taxFromPage)
                expect(totalPriceArray).toEqual(totalFromPage)
                expect(finaltotalPricefromArray).toEqual(finalTotalFromPage)
                await updateTestResult(testCaseId, 'Pass');
            
        } catch (error) {
            console.log(`Error in test case ${testCaseId}: ${error}`)
            await updateTestResult(testCaseId, 'Fail', error.message)
            
        }
    })
    test('TC-026: When clicking "Cancel", should navigate back to the product page',async ({loginPage, productPage,cartPage,checkInfoPage,checkoutOverviewPage}) => {
        const testCaseId = 'TC-026'
        try {
            await loginPage.fillUserPassword(username, password);
                await loginPage.clickLoginButton();
                expect(await loginPage.getErrorMessage()).not.toContain('is required')
                expect(loginPage.invalidUrl()).toBe(false);
                expect(productPage.invalidUrl()).toBe(true);

                const productsArray = [];
                productsArray.push(await productPage.addBackpack());
                expect(await productPage.getCountCart()).toContain('1')
                productsArray.push(await productPage.addBoltTshirt());
                expect(await productPage.getCountCart()).toContain('2')
                

                await productPage.clickCartIcon()
                expect(cartPage.invalidUrl()).toBe(true);


                await cartPage.clickCheckout()
                expect(checkInfoPage.invalidUrl()).toBe(true);
                await checkInfoPage.fillFirstName(firstName)
                await checkInfoPage.fillLastName(lastName)
                await checkInfoPage.fillZipCode(zipCode)
                
                await checkInfoPage.clickContinue()
                expect(checkoutOverviewPage.invalidUrl()).toBe(true);

                await checkoutOverviewPage.clickCancelButton()
                expect(checkoutOverviewPage.invalidUrl()).toBe(false);
                expect(productPage.invalidUrl()).toBe(true);
                
                await updateTestResult(testCaseId, 'Pass');
            
        } catch (error) {
            console.log(`Error in test case ${testCaseId}: ${error}`)
            await updateTestResult(testCaseId, 'Fail')
            
        }
    })
    test('TC-027: When clicking "Finish", should process to the checkout complete page',async ({loginPage, productPage,cartPage,checkInfoPage,checkoutOverviewPage}) => {
        const testCaseId = 'TC-027'
        try {
            await loginPage.fillUserPassword(username, password);
                await loginPage.clickLoginButton();
                expect(await loginPage.getErrorMessage()).not.toContain('is required')
                expect(loginPage.invalidUrl()).toBe(false);
                expect(productPage.invalidUrl()).toBe(true);

                const productsArray = [];
                productsArray.push(await productPage.addBackpack());
                expect(await productPage.getCountCart()).toContain('1')
                productsArray.push(await productPage.addBoltTshirt());
                expect(await productPage.getCountCart()).toContain('2')
                

                await productPage.clickCartIcon()
                expect(cartPage.invalidUrl()).toBe(true);


                await cartPage.clickCheckout()
                expect(checkInfoPage.invalidUrl()).toBe(true);
                await checkInfoPage.fillFirstName(firstName)
                await checkInfoPage.fillLastName(lastName)
                await checkInfoPage.fillZipCode(zipCode)
                
                await checkInfoPage.clickContinue()
                expect(checkoutOverviewPage.invalidUrl()).toBe(true);

                await checkoutOverviewPage.clickFinishButton()
                expect(checkoutOverviewPage.invalidUrl()).toBe(false);

                await updateTestResult(testCaseId, 'Pass');
            
        } catch (error) {
            console.log(`Error in test case ${testCaseId}: ${error}`)
            await updateTestResult(testCaseId, 'Fail')
        }
    })

})