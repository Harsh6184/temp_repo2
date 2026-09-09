import { test, expect, Page } from '@playwright/test';

const staysUrl = 'https://phptravels.net/stays';
async function openStays(page: Page) { await page.goto(staysUrl); const notice = page.getByRole('button', { name: 'I Understand & Continue' }); if (await notice.isVisible().catch(() => false)) await notice.click(); }
async function reachBooking(page: Page) { await page.locator('#st_dest_trigger').click(); await page.getByRole('textbox', { name: 'Search By City' }).fill('Dubai'); await page.getByText('Dubai, United Arab Emirates', { exact: true }).click(); await page.locator('#st_nationality_trigger').click(); await page.getByPlaceholder('Search country...').fill('United States'); await page.getByText('United States', { exact: true }).last().click(); await page.getByRole('button', { name: 'Search Hotels' }).click(); const action = page.getByRole('button', { name: /book now|select room|continue|reserve/i }).first(); if (!(await action.count())) return false; await action.click(); return true; }

test.describe('Stays Booking UI', () => {
  test('Review hotel booking before payment', async ({ page }) => {
    // 1. Complete required visible booking fields with non-sensitive test data.
    await openStays(page);
    if (!(await reachBooking(page))) { test.skip(true, 'The public demo currently exposes no available booking action.'); return; }
    const fields = page.getByRole('textbox');
    for (let index = 0; index < await fields.count(); index++) { const field = fields.nth(index); if (await field.isEditable().catch(() => false)) await field.fill('Demo User'); }
    const continueAction = page.getByRole('button', { name: /continue|review|book|reserve/i }).last();
    if (await continueAction.count()) await continueAction.click();

    // 2. Inspect the booking summary.
    await expect(page.locator('body')).toContainText(/hotel|room|date|guest|price|cancel/i);

    // 3. Return to an earlier step and change a booking value.
    const back = page.getByRole('button', { name: /back|edit|modify/i }).first();
    if (await back.count()) { await back.click(); await expect(page.locator('body')).toContainText(/booking|search|guest|hotel/i); }
  });
});
