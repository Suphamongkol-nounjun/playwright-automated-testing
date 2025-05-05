import { expect } from '@playwright/test';
import { test } from "../Pages/base";

test.beforeEach(async ({loginPage}) => {
    await loginPage.goto()
})

test('Input fields should display as the data that was filled',async ({loginPage}) => {
   await loginPage.fillUserPassword('testuser', 'testpassword');

   expect(await loginPage.getUsernameValue()).toBe('testuser');
   expect(await loginPage.getPasswordValue()).toBe('testpassword');
});

test('Should show an error message if log in without a username',async ({loginPage}) => {
    await loginPage.fillUserPassword('','testpassword');
    await loginPage.clickLoginButton();

    const message = await loginPage.getErrorMessage()
    // console.log("message: ",message);
    expect(message).toContain('is required')
    expect(loginPage.invalidUrl()).toBe(true);
    
    
});

test('Should show an error message if log in without a password',async ({loginPage}) => {

    await loginPage.fillUserPassword('testuser','');
    await loginPage.clickLoginButton();

    const message = await loginPage.getErrorMessage()
    // console.log("message: ",message);
    expect(message).toContain('is required')
    expect(loginPage.invalidUrl()).toBe(true);
});

test('Should show an error message if log in with both fields blank',async ({loginPage}) => {

    await loginPage.fillUserPassword('','');
    await loginPage.clickLoginButton();

    const message = await loginPage.getErrorMessage()
    // console.log("message: ",message);
    expect(message).toContain('is required')
    expect(loginPage.invalidUrl()).toBe(true);
});
/*

test('Should logged in successfully with valid credentials',async ({loginPage}) => {});
test('Should logged in fails with an error message when using invalid credentials',async ({loginPage}) => {});
*/