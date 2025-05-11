import { test as base } from '@playwright/test';
import { LoginPage } from './login.page';
import { ProductPage } from './product.page';
import { CartPage } from './cart.page';
import { CheckInfoPage } from './checkinfo.page';
import { CheckOutOverViewPage } from './checkoutoverview.page';
import { CheckOutCompletePage } from './checkoutcomplete.page';


type baseFixtures = {

    loginPage: LoginPage,
    productPage: ProductPage,
    cartPage: CartPage,
    checkInfoPage: CheckInfoPage,
    checkoutOverviewPage: CheckOutOverViewPage,
    checkoutCompletePage: CheckOutCompletePage,
}

export const test = base.extend<baseFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    checkInfoPage: async ({ page }, use) => {
        await use(new CheckInfoPage(page));
    },
    checkoutOverviewPage: async ({ page }, use) => {
        await use(new CheckOutOverViewPage(page));
    },
    checkoutCompletePage: async ({ page }, use) => {
        await use(new CheckOutCompletePage(page));
    }
});
