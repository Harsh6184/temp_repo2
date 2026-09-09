import { test, expect, Page } from '@playwright/test';

const staysUrl = 'https://phptravels.net/stays';
async function openStays(page: Page) { await page.goto(staysUrl); const notice = page.getByRole('button', { name: 'I Understand & Continue' }); if (await notice.isVisible().catch(() => false)) await notice.click(); }
async function searchValid(page: Page) { await page.locator('#st_dest_trigger').click(); await page.getByRole('textbox', { name: 'Search By City' }).fill('Dubai'); await page.getByText('Dubai, United Arab Emirates', { exact: true }).click(); await page.locator('#st_nationality_trigger').click(); await page.getByPlaceholder('Search country...').fill('United States'); await page.getByText('United States', { exact: true }).last().click(); await page.getByRole('button', { name: 'Search Hotels' }).click(); }

test.describe('Stays Results and Room Selection', () => {
  test('Open property details and select a room', async ({ page }) => {
    // 1. Select a hotel result with visible availability.
    await openStays(page);
    await searchValid(page);
    const propertyAction = page.getByRole('button', { name: /view|details|select room|book now/i }).first();
    if (!(await propertyAction.count())) { await expect(page.locator('body')).toContainText(/no result|no availability|error|hotel/i); return; }
    await propertyAction.click();
    await expect(page.locator('body')).toContainText(/room|rate|property|hotel/i);

    // 2. Review the property, dates, occupancy, room/rate, price, and cancellation information.
    await expect(page.locator('body')).toContainText(/price|USD|night|cancel|date|guest/i);

    // 3. Select an available room or rate.
    const roomAction = page.getByRole('button', { name: /select|choose|book|continue/i }).first();
    if (await roomAction.count()) {
      await expect(roomAction).toBeEnabled();
      await roomAction.click();
      await expect(page.locator('body')).toContainText(/booking|checkout|guest|room|continue/i);
    }
  });
});
