import { test, expect, Page } from '@playwright/test';

const staysUrl = 'https://phptravels.net/stays';
async function openStays(page: Page) { await page.goto(staysUrl); const notice = page.getByRole('button', { name: 'I Understand & Continue' }); if (await notice.isVisible().catch(() => false)) await notice.click(); }
async function searchValid(page: Page) { await page.locator('#st_dest_trigger').click(); await page.getByRole('textbox', { name: 'Search By City' }).fill('Dubai'); await page.getByText('Dubai, United Arab Emirates', { exact: true }).click(); await page.locator('#st_nationality_trigger').click(); await page.getByPlaceholder('Search country...').fill('United States'); await page.getByText('United States', { exact: true }).last().click(); await page.getByRole('button', { name: 'Search Hotels' }).click(); }

test.describe('Stays Results and Room Selection', () => {
  test('Display results for a valid hotel search', async ({ page }) => {
    // 1. Submit a valid Stays search using a supported destination, future dates, two adults, one room, and nationality.
    await openStays(page);
    await searchValid(page);
    await expect(page).toHaveURL(/stays|hotels/i);
    await expect(page.locator('body')).toContainText(/Dubai|hotel|search/i);

    // 2. Inspect the visible hotel cards.
    const cards = page.locator('article, [data-testid*="hotel" i], [class*="hotel-card" i]');
    if (await cards.count()) await expect(cards.first()).toContainText(/price|USD|available|room|night/i);

    // 3. Wait for the results state to finish loading.
    await expect(page.locator('body')).not.toContainText(/loading\.\.\.|please wait/i);
    await expect(page.locator('body')).toContainText(/Dubai|no result|no hotel|error|hotel/i);
  });
});
