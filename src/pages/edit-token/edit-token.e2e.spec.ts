import { expect, test } from '@playwright/test'

test('edit token in wallet', async ({ page }) => {
  await page.goto('/')
  await page.getByText('Add Token').click()
  await page.getByLabel('Token').fill('TOKEN_TEST')
  await page.getByLabel('Balance').fill('1000')
  await page.getByText('Save').click()
  await page.waitForURL('/')

  await page.getByTestId(/button-edit/).click()
  await page.getByLabel('Balance').fill('10000')
  await page.getByText('Save').click()
  await page.waitForURL('/')
  expect(page.getByText('R$ 10.000')).toBeVisible()
})

test('remove token in wallet', async ({ page }) => {
  await page.goto('/')
  await page.getByText('Add Token').click()
  await page.getByLabel('Token').fill('TOKEN_TEST')
  await page.getByLabel('Balance').fill('1000')
  await page.getByText('Save').click()
  await page.waitForURL('/')

  expect(page.getByText('TOKEN_TEST')).toBeVisible()
  expect(page.getByText('R$ 1.000')).toBeVisible()

  await page.getByTestId(/button-edit/).click()
  await page.getByText('Remove').click()
  await page.getByRole('dialog').getByRole('button', { name: 'Remove' }).click()

  await page.goto('/')

  expect(page.getByText('TOKEN_TEST')).not.toBeVisible()
  expect(page.getByText('R$ 1.000')).not.toBeVisible()
})
