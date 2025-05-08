import { expect } from '@playwright/test';
import { test } from "../Pages/base";
import { updateTestResult } from '../utils/updateGoogleSheet';
import { invalidUser, problemUser, validUser } from '../test-data/user';
import { addressUser } from '../test-data/addess';



test.describe('CHECKOUT INFORMATION PAGE FUNCTION', () => {
    const { username, password } = validUser[0];
    const { firstName, lastName, zipCode } = addressUser[0];

    test.beforeEach(async ({loginPage}) => {
        await loginPage.goto()
    })

    test('TC-019: When clicking "Cancel", should navigate back to the cart page', async ({loginPage, productPage,cartPage,checkInfoPage}) => {
     const testCaseId = 'TC-019'
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
        expect(checkInfoPage.invalidUrl()).toBe(true);

        await checkInfoPage.clickCancel()
        expect(checkInfoPage.invalidUrl()).toBe(false);
        expect(cartPage.invalidUrl()).toBe(true);
        expect(await productPage.getCountCart()).toContain('2')
        
        await updateTestResult(testCaseId, 'Pass');
        
     } catch (error) {
        console.error('Error in test case:', error);
        await updateTestResult(testCaseId, 'Fail');
        throw error; 
     }

    })
    test('TC-020: When clicking "Continue" without any client information, should display an error message', async ({loginPage, productPage,cartPage,checkInfoPage}) => {
        const testCaseId = 'TC-020'
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
            expect(checkInfoPage.invalidUrl()).toBe(true);

            await checkInfoPage.clickContinue()
            expect(checkInfoPage.invalidUrl()).toBe(true);
            
            const errorMessage = await checkInfoPage.getErrorMessage()
            expect(errorMessage).toContain('is required')
            expect(checkInfoPage.invalidUrl()).toBe(true);
            
            await updateTestResult(testCaseId, 'Pass');
            
         } catch (error) {
            console.error('Error in test case:', error);
            await updateTestResult(testCaseId, 'Fail');
            throw error; 
         }
    })
    test('TC-021: When clicking "Continue" with some client information, should display an error message', async ({loginPage, productPage,cartPage,checkInfoPage}) => {
        const testCaseId = 'TC-021'
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
            expect(checkInfoPage.invalidUrl()).toBe(true);

            console.log('First Name:', firstName);
            console.log('Last Name:', lastName);
            console.log('Zip Code:', zipCode);

            await checkInfoPage.fillFirstName(firstName)
            await checkInfoPage.clickContinue()          
            expect(await checkInfoPage.getErrorMessage()).toContain('Last Name is required')
            expect(checkInfoPage.invalidUrl()).toBe(true);

            await checkInfoPage.fillFirstName(firstName)
            await checkInfoPage.fillLastName(lastName)
            await checkInfoPage.clickContinue()
            expect(await checkInfoPage.getErrorMessage()).toContain('Postal Code is required')
            expect(checkInfoPage.invalidUrl()).toBe(true);
            
            await updateTestResult(testCaseId, 'Pass');
            
         } catch (error) {
            console.error('Error in test case:', error);
            await updateTestResult(testCaseId, 'Fail');
            throw error; 
         }
    })
    test('TC-022: When clicking "Continue" with all client information, should proceed to the checkout overview page', async ({loginPage, productPage,cartPage,checkInfoPage}) => {
        const testCaseId = 'TC-022'
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
            expect(checkInfoPage.invalidUrl()).toBe(true);

            console.log('First Name:', firstName);
            console.log('Last Name:', lastName);
            console.log('Zip Code:', zipCode);

            await checkInfoPage.fillFirstName(firstName)
            await checkInfoPage.fillLastName(lastName)
            await checkInfoPage.fillZipCode(zipCode)
            
            await checkInfoPage.clickContinue()
            
            expect(checkInfoPage.invalidUrl()).toBe(false);
            
         } catch (error) {
            console.error('Error in test case:', error);
            await updateTestResult(testCaseId, 'Fail');
         }
         finally{
             await updateTestResult(testCaseId, 'Pass');
         }
    })
})