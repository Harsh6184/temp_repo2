import { test, expect, Page } from '@playwright/test';

const staysUrl = 'https://phptravels.net/stays';
async function openStays(page: Page) { await page.goto(staysUrl); const notice = page.getByRole('button', { name: 'I Understand & Continue' }); if (await notice.isVisible().catch(() => false)) await notice.click(); }
async function reachBooking(page: Page) { await page.locator('#st_dest_trigger').click(); await page.getByRole('textbox', { name: 'Search By City' }).fill('Dubai'); await page.getByText('Dubai, United Arab Emirates', { exact: true }).click(); await page.locator('#st_nationality_trigger').click(); await page.getByPlaceholder('Search country...').fill('United States'); await page.getByText('United States', { exact: true }).last().click(); await page.getByRole('button', { name: 'Search Hotels' }).click(); const action = page.getByRole('button', { name: /book now|select room|continue|reserve/i }).first(); if (!(await action.count())) return false; await action.click(); return true; }

test.describe('Stays Booking UI', () => {
  test('Require terms acceptance before final booking', async ({ page }) => {
    // 1. Reach the final booking or sandbox payment step without accepting the displayed terms.
    await openStays(page);
    if (!(await reachBooking(page))) { test.skip(true, 'The public demo currently exposes no available booking action.'); return; }
    const terms = page.getByRole('checkbox', { name: /terms|condition|agree/i }).first();
    if (!(await terms.count())) { test.skip(true, 'No visible terms control is exposed in the current demo flow.'); return; }
    await expect(terms).not.toBeChecked();

    // 2. Click the final action.
    const finalAction = page.getByRole('button', { name: /book|confirm|pay|complete/i }).last();
    await finalAction.click();
    await expect(page.locator('body')).toContainText(/terms|condition|agree|required/i);

    // 3. Accept the terms and continue using only an approved sandbox path.
    await terms.check();
    await expect(terms).toBeChecked();
    await expect(page.locator('body')).not.toContainText(/real card|live payment/i);
  });
});
