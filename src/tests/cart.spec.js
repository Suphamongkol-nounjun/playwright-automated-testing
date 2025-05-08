import { expect } from '@playwright/test';
import { test } from "../Pages/base";
import { updateTestResult } from '../utils/updateGoogleSheet';
import { invalidUser, problemUser, validUser } from '../test-data/user';
import { expectArraysToMatchUnordered } from '../utils/checkTwoArray';



test.describe('CART FUNCTION', () => {
    const { username, password } = validUser[0];

    test.beforeEach(async ({loginPage}) => {
        await loginPage.goto()
    })
    

     test('TC-014: The cart badge should displays the correct number of items currently in the cart', async ({loginPage, productPage,cartPage}) => {
        const testCaseId = 'TC-014'
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

                await cartPage.goto()
                expect(cartPage.invalidUrl()).toBe(true);

                expect(await cartPage.getCountCart()).toEqual(await cartPage.getClassAmount())
                
                await cartPage.clickContinueShopping()
                expect(cartPage.invalidUrl()).toBe(false);

                await productPage.addBoltTshirt();
                expect(await productPage.getCountCart()).toContain('3')
                await productPage.addFleeceJacket();
                expect(await productPage.getCountCart()).toContain('4')

                await cartPage.goto()
                expect(cartPage.invalidUrl()).toBe(true);

                expect(await cartPage.getCountCart()).toEqual(await cartPage.getClassAmount())

                await updateTestResult(testCaseId, 'Pass');
            
        } catch (error) {
            console.log('Error in test case:', testCase, error)
            await updateTestResult(testCase, 'Fail', error.message)
            
        }
    })
     test('TC-015: The item name and price in the cart should match the selection from the product page', async ({loginPage, productPage,cartPage}) => {
        const testCaseId = 'TC-015'
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


                await cartPage.goto()
                expect(cartPage.invalidUrl()).toBe(true);

                const actual = await cartPage.getProductNamesandPrices();

                await expectArraysToMatchUnordered(productsArray, actual)
                await updateTestResult(testCaseId, 'Pass');
            
        } catch (error) {
            console.log('Error in test case:', testCaseId, error)
            await updateTestResult(testCaseId, 'Fail', error.message)
        }
     })
     test('TC-016: Should remove the selected item from the cart and update the cart badge', async ({loginPage, productPage,cartPage}) => {

        const testCaseId = 'TC-016'
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

                await cartPage.goto()
                expect(cartPage.invalidUrl()).toBe(true);


                await cartPage.removeBackpack()
                expect(await cartPage.getCountCart()).toEqual(1);
                          
                await updateTestResult(testCaseId, 'Pass');
            
        } catch (error) {
            console.log('Error in test case:', testCaseId, error)
            await updateTestResult(testCaseId, 'Fail', error.message)
        }
     })
    test('TC-017: When clicking "Continue Shopping", should navigates back to the product page', async ({loginPage, productPage,cartPage}) => {
        const testCaseId = 'TC-017'
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

                await cartPage.goto()
                expect(cartPage.invalidUrl()).toBe(true);

                await cartPage.clickContinueShopping()
                expect(cartPage.invalidUrl()).toBe(false);
                expect(productPage.invalidUrl()).toBe(true);
                expect(await productPage.getCountCart()).toContain('2')
                
                await updateTestResult(testCaseId, 'Pass');
            
        } catch (error) {
            console.log('Error in test case:', testCaseId, error)
            await updateTestResult(testCaseId, 'Fail', error.message)
        }
    })
    test('TC-018: When clicking "Checkout", should proceed to the checkout information page', async ({loginPage, productPage,cartPage}) => {
            const testCaseId = 'TC-018'
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

                    await cartPage.goto()
                    expect(cartPage.invalidUrl()).toBe(true);

                    await cartPage.clickCheckout()
                    expect(cartPage.invalidUrl()).toBe(false);
                    
                    await updateTestResult(testCaseId, 'Pass');
                
            } catch (error) {
                console.log('Error in test case:', testCaseId, error)
                await updateTestResult(testCaseId, 'Fail', error.message)
            }

    })

})