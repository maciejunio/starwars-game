import { test as setup } from '@playwright/test';

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  await page.goto('/');
  await page.getByLabel('Email').fill('test@o2.pl');
  await page.getByLabel('Password').fill('test123');
  await page.click("#submitBtn");
  await page.waitForURL('/GamePreparation');

  await page.context().storageState({ path: authFile });
});