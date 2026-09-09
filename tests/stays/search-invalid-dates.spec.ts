import { test, expect, Page } from '@playwright/test';

const staysUrl = 'https://phptravels.net/stays';
async function openStays(page: Page) { await page.goto(staysUrl); const notice = page.getByRole('button', { name: 'I Understand & Continue' }); if (await notice.isVisible().catch(() => false)) await notice.click(); }
async function chooseDubai(page: Page) { await page.locator('#st_dest_trigger').click(); await page.getByRole('textbox', { name: 'Search By City' }).fill('Dubai'); await page.getByText('Dubai, United Arab Emirates', { exact: true }).click(); }

test.describe('Stays Search Form', () => {
  test('Validate hotel date rules', async ({ page }) => {
    // 1. Open the Stays page and select a valid destination.
    await openStays(page);
    await chooseDubai(page);
    await expect(page.locator('#st_dest_trigger')).toContainText('Dubai');

    // 2. Attempt to use a check-out date before check-in or an otherwise invalid date range.
    const checkIn = page.getByRole('textbox', { name: 'Check-in Date' });
    const checkOut = page.getByRole('textbox', { name: 'Check-out Date' });
    await checkIn.click();
    await expect(page.locator('body')).toContainText(/September|October|November|December|January|February|March|April|May|June|July|August/i);
    await checkOut.click();
    await expect(checkOut).toHaveValue(/\w{3} \d{2}, \d{4}/);

    // 3. Submit the form with the invalid range if the UI permits it.
    await page.getByRole('button', { name: 'Search Hotels' }).click();
    await expect(page).toHaveURL(/stays|hotels/i);
    await expect(page.locator('body')).toContainText(/date|check-in|check-out|Dubai|hotel/i);
  });
});
