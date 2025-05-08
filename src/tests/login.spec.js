import { expect } from '@playwright/test';
import { test } from "../Pages/base";
import { invalidUser, problemUser, validUser } from '../test-data/user';
import { updateTestResult } from '../utils/updateGoogleSheet';

test.describe('LOGIN FUNCTION', () => {

test.beforeEach(async ({loginPage}) => {
    await loginPage.goto()
})

test('TC-001: Input fields should display as the data that was filled',async ({loginPage}) => {
    const testCaseId = 'TC-001';
    try {
        await loginPage.fillUserPassword('testuser', 'testpassword');

        expect(await loginPage.getUsernameValue()).toBe('testuser');
        expect(await loginPage.getPasswordValue()).toBe('testpassword');
        await updateTestResult(testCaseId, 'Pass');
    } catch (error) {
        await updateTestResult(testCaseId, 'Fail');
        throw e; 
    }
   
});

test('TC-002: Should show an error message if log in without a username',async ({loginPage}) => {
    const testCaseId = 'TC-002';
    try {
        await loginPage.fillUserPassword('', 'testpassword');
        await loginPage.clickLoginButton();

        expect(await loginPage.getErrorMessage()).toContain('is required')
        expect(loginPage.invalidUrl()).toBe(true);
        await updateTestResult(testCaseId, 'Pass');
    } catch (error) {
        await updateTestResult(testCaseId, 'Fail');
        throw e; 
    }
    
});

test('TC-003: Should show an error message if log in without a password',async ({loginPage}) => {
    const testCaseId = 'TC-003';
    try {
        await loginPage.fillUserPassword('testuser', '');
        await loginPage.clickLoginButton();

        expect(await loginPage.getErrorMessage()).toContain('is required')
        expect(loginPage.invalidUrl()).toBe(true);
        await updateTestResult(testCaseId, 'Pass');
    } catch (error) {
        await updateTestResult(testCaseId, 'Fail');
        throw e; 
    }

    // await loginPage.fillUserPassword('testuser','');
    // await loginPage.clickLoginButton();

    // // const message = await loginPage.getErrorMessage()
    // // // console.log("message: ",message);
    // // expect(message).toContain('is required')
    // expect(await loginPage.getErrorMessage()).toContain('is required')
    // expect(loginPage.invalidUrl()).toBe(true);
});

test('TC-004: Should show an error message if log in with both fields blank',async ({loginPage}) => {
    const testCaseId = 'TC-004';
    try {
        await loginPage.fillUserPassword('', '');
        await loginPage.clickLoginButton();

        expect(await loginPage.getErrorMessage()).toContain('is required')
        expect(loginPage.invalidUrl()).toBe(true);
        await updateTestResult(testCaseId, 'Pass');
    } catch (error) {
        await updateTestResult(testCaseId, 'Fail');
        throw e; 
    }

    // await loginPage.fillUserPassword('','');
    // await loginPage.clickLoginButton();

    // // const message = await loginPage.getErrorMessage()
    // // // console.log("message: ",message);
    // // expect(message).toContain('is required')
    // expect(await loginPage.getErrorMessage()).toContain('is required')
    // expect(loginPage.invalidUrl()).toBe(true);
});

validUser.forEach(({username, password}) => {
    test(`TC-005: Should logged in successfully with valid credentials: ${username} `,async ({loginPage}) => {
        const testCaseId = 'TC-005';
        try {
            await loginPage.fillUserPassword(username, password);
            await loginPage.clickLoginButton();
            expect(await loginPage.getErrorMessage()).not.toContain('is required')
            expect(loginPage.invalidUrl()).toBe(false);
            //ต้องเพิ่มเคสกลับไปที่หน้า Login ไม่ได้ต้องกลับไปที่หน้า Product
            

            await updateTestResult(testCaseId, 'Pass');
        } catch (error) {
            await updateTestResult(testCaseId, 'Fail');
            throw e; 
        }

        // await loginPage.fillUserPassword(username, password);
        // await loginPage.clickLoginButton();
        // expect(await loginPage.getErrorMessage()).not.toContain('is required')
        // expect(loginPage.invalidUrl()).toBe(false);
    });
})

invalidUser.forEach(({username, password}) => {
    test(`TC-006: Should logged in fails with an error message when using invalid credentials: ${username} `,async ({loginPage}) => {
        const testCaseId = 'TC-006';
        try {
            await loginPage.fillUserPassword(username, password);
            await loginPage.clickLoginButton();
            expect(await loginPage.getErrorMessage()).toContain('Epic sadface')
            expect(loginPage.invalidUrl()).toBe(true);
            await updateTestResult(testCaseId, 'Pass');
        } catch (error) {
            await updateTestResult(testCaseId, 'Fail');
            throw e; 
        }
        // await loginPage.fillUserPassword(username, password);
        // await loginPage.clickLoginButton();
        // expect(await loginPage.getErrorMessage()).toContain('Epic sadface')
        // expect(loginPage.invalidUrl()).toBe(true);
    });
})
})