import { expect } from '@playwright/test';
import { test } from "../Pages/base";
import { updateTestResult } from '../utils/updateGoogleSheet';
import { invalidUser, problemUser, validUser } from '../test-data/user';
import { addressUser } from '../test-data/addess';



test.describe('CHECKOUT OVERVIEW PAGE FUNCTION', () => {
    const { username, password } = validUser[0];
    const { firstName, lastName, zipCode } = addressUser[0];

    test.beforeEach(async ({loginPage}) => {
        await loginPage.goto()
    })
    test('TC-028: The cart badge number should be removed', async ({ loginPage, productPage,cartPage,checkInfoPage,checkoutOverviewPage,checkoutCompletePage }) => {
        const testCaseId = 'TC-028'
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
                expect(checkoutCompletePage.invalidUrl()).toBe(true);
                expect(await productPage.getCountCart()).toContain('')

                await updateTestResult(testCaseId, 'Pass');
            
        } catch (error) {
            console.log('Error:', error)
            await updateTestResult(testCaseId, 'Fail')
            
        }

    })
    test('TC-029: Display message', async ({ loginPage, productPage,cartPage,checkInfoPage,checkoutOverviewPage,checkoutCompletePage }) => {
        const testCaseId = 'TC-029'
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
                expect(checkoutCompletePage.invalidUrl()).toBe(true);
                expect(await productPage.getCountCart()).toContain('')
                expect(await checkoutCompletePage.getHeaderText()).toContain('Thank you for your order!')
                expect(await checkoutCompletePage.getCompleteText()).toContain('Your order has been dispatched, and will arrive just as fast as the pony can get there!')

                await updateTestResult(testCaseId, 'Pass');
            
        } catch (error) {
            console.log('Error:', error)
            await updateTestResult(testCaseId, 'Fail')
            
        } 
     })
    test('TC-030: When clicking "Back Home", should navigate back to the product page', async ({ loginPage, productPage,cartPage,checkInfoPage,checkoutOverviewPage,checkoutCompletePage }) => {
                const testCaseId = 'TC-030'
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
                expect(checkoutCompletePage.invalidUrl()).toBe(true);
                expect(await productPage.getCountCart()).toContain('')
                await checkoutCompletePage.clickBackHome()
                expect(checkoutCompletePage.invalidUrl()).toBe(false);
                expect(productPage.invalidUrl()).toBe(true);

                await updateTestResult(testCaseId, 'Pass');
            
        } catch (error) {
            console.log('Error:', error)
            await updateTestResult(testCaseId, 'Fail')
            
        } 
    })
    
    
})