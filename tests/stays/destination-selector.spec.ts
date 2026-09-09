import { test, expect, Page } from '@playwright/test';

const staysUrl = 'https://phptravels.net/stays';
async function openStays(page: Page) { await page.goto(staysUrl); const notice = page.getByRole('button', { name: 'I Understand & Continue' }); if (await notice.isVisible().catch(() => false)) await notice.click(); }

test.describe('Stays Search Form', () => {
  test('Search destination by city or hotel name', async ({ page }) => {
    // 1. Open the Destination or Hotel Name selector.
    await openStays(page);
    await page.locator('#st_dest_trigger').click();
    await expect(page.getByRole('textbox', { name: 'Search By City' })).toBeVisible();

    // 2. Type a partial supported city or hotel name.
    const destinationSearch = page.getByRole('textbox', { name: 'Search By City' });
    await destinationSearch.fill('Dubai');
    await expect(page.getByText('Dubai, United Arab Emirates', { exact: true })).toBeVisible();
    await expect(page.getByText('Address Downtown Dubai', { exact: true })).toBeVisible();

    // 3. Select a suggestion and reopen the selector with a value that has no matches.
    await page.getByText('Dubai, United Arab Emirates', { exact: true }).click();
    await expect(page.locator('#st_dest_trigger')).toContainText('Dubai');
    await page.locator('#st_dest_trigger').click();
    await page.getByRole('textbox', { name: 'Search By City' }).fill('NoSuchDestination999');
    await expect(page.locator('body')).toContainText(/no result|not found|no match|type to search/i);
    await page.getByRole('textbox', { name: 'Search By City' }).press('Escape');
    await expect(page.locator('#st_dest_trigger')).toContainText('Dubai');
  });
});
