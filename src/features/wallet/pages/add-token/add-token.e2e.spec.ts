import { expect, test } from '@playwright/test'

test('add token to wallet', async ({ page }) => {
  await page.goto('/')
  await page.getByText('Add Token').click()
  await page.getByLabel('Token').fill('TOKEN_TEST')
  await page.getByLabel('Balance').fill('1000')
  await page.getByText('Save').click()
  await page.waitForURL('/')
  expect(page.getByText('TOKEN_TEST')).toBeVisible()
  expect(page.getByText('R$ 1.000,00')).toBeVisible()
})
