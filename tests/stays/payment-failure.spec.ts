import { test, expect, Page } from '@playwright/test';

const staysUrl = 'https://phptravels.net/stays';
async function openStays(page: Page) { await page.goto(staysUrl); const notice = page.getByRole('button', { name: 'I Understand & Continue' }); if (await notice.isVisible().catch(() => false)) await notice.click(); }

test.describe('Stays Booking UI', () => {
  test('Handle failed or cancelled sandbox payment', async ({ page }) => {
    // 1. Reach the Stays payment step and use the approved sandbox failure or cancellation path.
    await openStays(page);
    test.skip(true, 'The public demo does not expose a deterministic sandbox failure or cancellation path.');
    await expect(page.locator('body')).toContainText(/payment|checkout|booking/i);

    // 2. Retry once or abandon the booking using the visible UI.
    const retry = page.getByRole('button', { name: /retry|try again|back|cancel|close/i }).first();
    if (await retry.count()) await retry.click();
    await expect(page.locator('body')).toContainText(/retry|cancel|search|booking|payment/i);
    await expect(page.locator('body')).not.toContainText(/booking confirmed|confirmation number/i);
  });
});
