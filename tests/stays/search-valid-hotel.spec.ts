import { test, expect, Page } from '@playwright/test';

const staysUrl = 'https://phptravels.net/stays';
async function dismissDemoNotice(page: Page) { const noticeButton = page.getByRole('button', { name: 'I Understand & Continue' }); if (await noticeButton.isVisible().catch(() => false)) await noticeButton.click(); }
async function selectDubai(page: Page) { await page.locator('#st_dest_trigger').click(); await page.getByRole('textbox', { name: 'Search By City' }).fill('Dubai'); await expect(page.getByText('Dubai, United Arab Emirates', { exact: true })).toBeVisible(); await page.getByText('Dubai, United Arab Emirates', { exact: true }).click(); }

test.describe('Stays Search Form', () => {
  test('Search hotels with valid criteria', async ({ page }) => {
    // 1. Open https://phptravels.net/stays in a fresh browser context.
    await page.goto(staysUrl);
    await expect(page).toHaveTitle(/Stays PHPTRAVELS/i);
    await expect(page.getByRole('button', { name: 'Search Hotels' })).toBeVisible();

    // 2. Dismiss the demo notice if it appears by clicking "I Understand & Continue".
    await dismissDemoNotice(page);

    // 3. Select a supported city or hotel, valid future check-in and check-out dates, one room, two adults, zero children, and a supported nationality.
    await selectDubai(page);
    await expect(page.locator('#st_dest_trigger')).toContainText('Dubai');
    await expect(page.getByRole('textbox', { name: 'Check-in Date' })).toHaveValue(/\w{3} \d{2}, \d{4}/);
    await expect(page.getByRole('textbox', { name: 'Check-out Date' })).toHaveValue(/\w{3} \d{2}, \d{4}/);
    await expect(page.locator('#st_guests_trigger')).toContainText('2 Guests, 1 Room');
    await page.locator('#st_nationality_trigger').click();
    await page.getByPlaceholder('Search country...').fill('United States');
    await expect(page.getByText('United States', { exact: true }).last()).toBeVisible();
    await page.getByText('United States', { exact: true }).last().click();
    await expect(page.locator('#st_nationality_trigger')).toContainText('United States');

    // 4. Click "Search Hotels".
    await page.getByRole('button', { name: 'Search Hotels' }).click();
    await expect(page).toHaveURL(/stays|hotels/i);
    await expect(page.locator('body')).toContainText(/Dubai|Search|hotel/i);
  });
});
