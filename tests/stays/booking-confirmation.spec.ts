import { test, expect, Page } from '@playwright/test';

const staysUrl = 'https://phptravels.net/stays';
async function openStays(page: Page) { await page.goto(staysUrl); const notice = page.getByRole('button', { name: 'I Understand & Continue' }); if (await notice.isVisible().catch(() => false)) await notice.click(); }

test.describe('Stays Booking UI', () => {
  test('Show booking confirmation after successful demo booking', async ({ page }) => {
    // 1. Complete a valid hotel booking with demo data and an approved sandbox payment path.
    await openStays(page);
    test.skip(true, 'The public demo does not expose a deterministic approved sandbox booking path; no payment data is entered.');

    // 2. Inspect the confirmation.
    await expect(page.locator('body')).toContainText(/confirmation|booking reference|hotel/i);

    // 3. Refresh the confirmation page once.
    await page.reload();
    await expect(page.locator('body')).toContainText(/confirmation|booking reference|recovery|booking/i);
  });
});
