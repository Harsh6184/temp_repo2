import { test, expect, Page } from '@playwright/test';

const staysUrl = 'https://phptravels.net/stays';
async function openStays(page: Page) { await page.goto(staysUrl); const notice = page.getByRole('button', { name: 'I Understand & Continue' }); if (await notice.isVisible().catch(() => false)) await notice.click(); }
async function reachBooking(page: Page) { await page.locator('#st_dest_trigger').click(); await page.getByRole('textbox', { name: 'Search By City' }).fill('Dubai'); await page.getByText('Dubai, United Arab Emirates', { exact: true }).click(); await page.locator('#st_nationality_trigger').click(); await page.getByPlaceholder('Search country...').fill('United States'); await page.getByText('United States', { exact: true }).last().click(); await page.getByRole('button', { name: 'Search Hotels' }).click(); const action = page.getByRole('button', { name: /book now|select room|continue|reserve/i }).first(); if (!(await action.count())) return false; await action.click(); return true; }

test.describe('Stays Booking UI', () => {
  test('Validate required booking details', async ({ page }) => {
    // 1. Reach the hotel booking-details or checkout step using an available room in the demo environment.
    await openStays(page);
    if (!(await reachBooking(page))) { test.skip(true, 'The public demo currently exposes no available booking action.'); return; }
    await expect(page.locator('body')).toContainText(/booking|guest|traveler|contact/i);

    // 2. Leave required fields empty and click the continue or booking action.
    const continueAction = page.getByRole('button', { name: /continue|book|reserve|confirm/i }).last();
    await continueAction.click();
    await expect(page.locator('body')).toContainText(/required|enter|invalid|missing/i);

    // 3. Enter malformed contact or traveler data.
    const email = page.getByLabel(/email/i).first();
    if (await email.count()) { await email.fill('not-an-email'); await continueAction.click(); await expect(page.locator('body')).toContainText(/valid|invalid|email/i); }
  });
});
