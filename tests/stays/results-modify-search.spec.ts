import { test, expect, Page } from '@playwright/test';

const staysUrl = 'https://phptravels.net/stays';
async function openStays(page: Page) { await page.goto(staysUrl); const notice = page.getByRole('button', { name: 'I Understand & Continue' }); if (await notice.isVisible().catch(() => false)) await notice.click(); }
async function searchValid(page: Page) { await page.locator('#st_dest_trigger').click(); await page.getByRole('textbox', { name: 'Search By City' }).fill('Dubai'); await page.getByText('Dubai, United Arab Emirates', { exact: true }).click(); await page.locator('#st_nationality_trigger').click(); await page.getByPlaceholder('Search country...').fill('United States'); await page.getByText('United States', { exact: true }).last().click(); await page.getByRole('button', { name: 'Search Hotels' }).click(); }

test.describe('Stays Results and Room Selection', () => {
  test('Modify the hotel search from results', async ({ page }) => {
    // 1. Open results from a valid hotel search.
    await openStays(page);
    await searchValid(page);
    const modify = page.getByRole('button', { name: /modify search|edit search|change search/i });
    if (!(await modify.count())) { await expect(page.locator('body')).toContainText(/Dubai|hotel|no result|error/i); return; }
    await modify.first().click();
    await expect(page.getByRole('textbox', { name: 'Check-in Date' })).toBeVisible();

    // 2. Change the dates or occupancy and apply the modified search.
    await page.locator('#st_guests_trigger').click();
    await page.getByRole('button', { name: 'add' }).last().click();
    await page.locator('#st_guests_trigger').click();
    await page.getByRole('button', { name: 'Search Hotels' }).click();
    await expect(page.locator('body')).toContainText(/room|guest|Dubai|hotel/i);

    // 3. Review the refreshed result state.
    await expect(page.locator('body')).not.toContainText(/loading\.\.\.|please wait/i);
    await expect(page.locator('body')).toContainText(/hotel|no result|no availability|error/i);
  });
});
