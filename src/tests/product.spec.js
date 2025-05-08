import { expect } from '@playwright/test';
import { test } from "../Pages/base";
import { updateTestResult } from '../utils/updateGoogleSheet';
import { invalidUser, problemUser, validUser } from '../test-data/user';

test.describe('PRODUCT FUNCTION', () => {
    const { username, password } = validUser[0];

    test.beforeEach(async ({loginPage}) => {
        await loginPage.goto()
    })
    
        test(`TC-007: Adding all available products to the cart and then removing them, verifying that the cart updates correctly`,async ({loginPage,productPage}) => {
            const testCaseId = 'TC-007';
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

                await productPage.addBoltTshirt();
                expect(await productPage.getCountCart()).toContain('3')

                await productPage.addFleeceJacket();
                expect(await productPage.getCountCart()).toContain('4')

                await productPage.addOnesie();
                expect(await productPage.getCountCart()).toContain('5')

                await productPage.addRedTshirt();
                expect(await productPage.getCountCart()).toContain('6')

                await productPage.removeBackpack();
                expect(await productPage.getCountCart()).toContain('5')

                await productPage.removeBikeLight();
                expect(await productPage.getCountCart()).toContain('4')

                await productPage.removeBoltTshirt();
                expect(await productPage.getCountCart()).toContain('3')

                await productPage.removeFleeceJacket();
                expect(await productPage.getCountCart()).toContain('2')

                await productPage.removeOnesie();
                expect(await productPage.getCountCart()).toContain('1')
                
                await productPage.removeRedTshirt();
                expect(await productPage.getCountCart()).toContain('')
            
                await updateTestResult(testCaseId, 'Pass');
            } catch (error) {
                await updateTestResult(testCaseId, 'Fail');
                throw e; 
            }
        });
        test(`TC-008: Adding multiple products to the cart and navigating between pages to verify that the cart count remains consistent and accurate`,async ({loginPage,productPage}) => {
            const testCaseId = 'TC-008';
            try {
                await loginPage.fillUserPassword(username, password);
                await loginPage.clickLoginButton();
                expect(await loginPage.getErrorMessage()).not.toContain('is required')
                expect(loginPage.invalidUrl()).toBe(false);
                expect(productPage.invalidUrl()).toBe(true);

                await productPage.addBackpack();
                expect(await productPage.getCountCart()).toContain('1')
                await productPage.clickBackpackProduct();
                expect(productPage.invalidUrl()).toBe(false);
                expect(await productPage.getCountCart()).toContain('1')
                await productPage.clickBackToProducts();
                expect(productPage.invalidUrl()).toBe(true);

                await productPage.addBikeLight();
                expect(await productPage.getCountCart()).toContain('2')
                await productPage.clickBikeLightProduct();
                expect(productPage.invalidUrl()).toBe(false);
                expect(await productPage.getCountCart()).toContain('2')
                await productPage.clickBackToProducts();
                expect(productPage.invalidUrl()).toBe(true);

                await productPage.addBoltTshirt();
                expect(await productPage.getCountCart()).toContain('3')
                await productPage.clickBoltTshirtProduct();
                expect(productPage.invalidUrl()).toBe(false);
                expect(await productPage.getCountCart()).toContain('3')
                await productPage.clickBackToProducts();
                expect(productPage.invalidUrl()).toBe(true);

                await productPage.addFleeceJacket();
                expect(await productPage.getCountCart()).toContain('4')
                await productPage.clickFleeceJacketProduct();
                expect(productPage.invalidUrl()).toBe(false);
                expect(await productPage.getCountCart()).toContain('4')
                await productPage.clickBackToProducts();
                expect(productPage.invalidUrl()).toBe(true);

                await productPage.addOnesie();
                expect(await productPage.getCountCart()).toContain('5')
                await productPage.clickOnesieProduct();
                expect(productPage.invalidUrl()).toBe(false);
                expect(await productPage.getCountCart()).toContain('5')
                await productPage.clickBackToProducts();
                expect(productPage.invalidUrl()).toBe(true);

                await productPage.addRedTshirt();
                expect(await productPage.getCountCart()).toContain('6')
                await productPage.clickRedTshirtProduct();
                expect(productPage.invalidUrl()).toBe(false);
                expect(await productPage.getCountCart()).toContain('6')
                await productPage.clickBackToProducts();
                expect(productPage.invalidUrl()).toBe(true);
                

                await updateTestResult(testCaseId, 'Pass');
            } catch (error) {
                await updateTestResult(testCaseId, 'Fail');
                throw e; 
            }
        });

        test('TC-009: Product should correctly sorts items from A to Z', async ({ loginPage,productPage }) => {
            const testCaseId = 'TC-009';
            try {
                await loginPage.fillUserPassword(username, password);
                await loginPage.clickLoginButton();
                expect(await loginPage.getErrorMessage()).not.toContain('is required')
                expect(loginPage.invalidUrl()).toBe(false);
                expect(productPage.invalidUrl()).toBe(true);
                const productNames = await productPage.getProductNames();

                await productPage.clickProductSortContainerZA();
                expect(await productPage.getProductNames()).toEqual(await productPage.sortProductsbyNameZA(productNames));
                await productPage.clickProductSortContainerAZ();
                expect(await productPage.getProductNames()).toEqual(await productPage.sortProductsbyNameAZ(productNames));

                expect(productPage.invalidUrl()).toBe(true);

                await updateTestResult(testCaseId, 'Pass');

            } catch (error) {
                await updateTestResult(testCaseId, 'Fail');
                throw error; 
                
            }
          });


     test('TC-010: Product should correctly sorts items from Z to A', async ({ loginPage,productPage }) => {
        const testCaseId = 'TC-010';
        try {
            await loginPage.fillUserPassword(username, password);
            await loginPage.clickLoginButton();
            expect(await loginPage.getErrorMessage()).not.toContain('is required')
            expect(loginPage.invalidUrl()).toBe(false);
            expect(productPage.invalidUrl()).toBe(true);
            const productNames = await productPage.getProductNames();

            await productPage.clickProductSortContainerZA();
            expect(await productPage.getProductNames()).toEqual(await productPage.sortProductsbyNameZA(productNames));

            expect(productPage.invalidUrl()).toBe(true);
           
            await updateTestResult(testCaseId, 'Pass');

        } catch (error) {
            await updateTestResult(testCaseId, 'Fail');
            throw error; 
            
        }



     })
     test('TC-011: Product should correctly sorts items from price low to high', async ({ loginPage,productPage }) => {

        const testCaseId = 'TC-011';
        try {
            await loginPage.fillUserPassword(username, password);
            await loginPage.clickLoginButton();
            expect(await loginPage.getErrorMessage()).not.toContain('is required')
            expect(loginPage.invalidUrl()).toBe(false);
            expect(productPage.invalidUrl()).toBe(true);
            const productPrices = await productPage.getProductPrices();

            await productPage.clickProductSortContainerLoHi();
            expect(await productPage.getProductPrices()).toEqual(await productPage.sortProductsbyPriceLowToHigh(productPrices));

            expect(productPage.invalidUrl()).toBe(true);

            await updateTestResult(testCaseId, 'Pass');

        } catch (error) {
            await updateTestResult(testCaseId, 'Fail');
            throw error; 
            
        }
     })
     test('TC-012: Product should correctly sorts items from price high to low', async ({ loginPage,productPage }) => {
        const testCaseId = 'TC-012';
        try {
            await loginPage.fillUserPassword(username, password);
            await loginPage.clickLoginButton();
            expect(await loginPage.getErrorMessage()).not.toContain('is required')
            expect(loginPage.invalidUrl()).toBe(false);
            expect(productPage.invalidUrl()).toBe(true);
            const productPrices = await productPage.getProductPrices();

            await productPage.clickProductSortContainerHiLo();
            expect(await productPage.getProductPrices()).toEqual(await productPage.sortProductsbyPriceHighToLow(productPrices));

            expect(productPage.invalidUrl()).toBe(true);

            await updateTestResult(testCaseId, 'Pass');

        } catch (error) {
            await updateTestResult(testCaseId, 'Fail');
            throw error; 
            
        }


     })
     test('TC-013: Should navigate to the cart page when clicking the cart icon', async ({ loginPage,productPage }) => {


        const testCaseId = 'TC-013';
        try {
            await loginPage.fillUserPassword(username, password);
            await loginPage.clickLoginButton();
            expect(await loginPage.getErrorMessage()).not.toContain('is required')
            expect(loginPage.invalidUrl()).toBe(false);
            expect(productPage.invalidUrl()).toBe(true);

            await productPage.clickCartIcon();
            expect(productPage.invalidUrl()).toBe(false);
            
            await updateTestResult(testCaseId, 'Pass');

        } catch (error) {
            await updateTestResult(testCaseId, 'Fail');
            throw error; 
            
        }
     })
})