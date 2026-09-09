import { test, expect, Page } from '@playwright/test';

const staysUrl = 'https://phptravels.net/stays';
async function openStays(page: Page) { await page.goto(staysUrl); const notice = page.getByRole('button', { name: 'I Understand & Continue' }); if (await notice.isVisible().catch(() => false)) await notice.click(); }
async function chooseDubai(page: Page) { await page.locator('#st_dest_trigger').click(); await page.getByRole('textbox', { name: 'Search By City' }).fill('Dubai'); await page.getByText('Dubai, United Arab Emirates', { exact: true }).click(); }
async function chooseNationality(page: Page) { await page.locator('#st_nationality_trigger').click(); await page.getByPlaceholder('Search country...').fill('United States'); await page.getByText('United States', { exact: true }).last().click(); }

test.describe('Stays Search Form', () => {
  test('Validate required destination and nationality', async ({ page }) => {
    // 1. Open the Stays page in a fresh browser context and dismiss the demo notice if needed.
    await openStays(page);
    await expect(page.getByRole('button', { name: 'Search Hotels' })).toBeVisible();

    // 2. Set valid dates and occupancy but leave the destination empty, then click "Search Hotels".
    await page.getByRole('button', { name: 'Search Hotels' }).click();
    await expect(page).toHaveURL(/stays/i);
    await expect(page.locator('body')).toContainText(/destination|required|select/i);

    // 3. Enter a valid destination but leave Nationality as "Select Nationality", then submit again.
    await chooseDubai(page);
    await expect(page.locator('#st_nationality_trigger')).toContainText('Select Nationality');
    await page.getByRole('button', { name: 'Search Hotels' }).click();
    await expect(page).toHaveURL(/stays/i);
    await expect(page.locator('body')).toContainText(/nationality|required|select/i);

    // 4. Select a valid nationality and submit with all other valid criteria.
    await chooseNationality(page);
    await page.getByRole('button', { name: 'Search Hotels' }).click();
    await expect(page).toHaveURL(/stays|hotels/i);
  });
});
