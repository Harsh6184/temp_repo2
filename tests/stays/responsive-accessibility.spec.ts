import { test, expect } from '@playwright/test';

test.describe('Stays Booking UI', () => {
  test('Verify Stays mobile and keyboard usability', async ({ page }) => {
    // 1. Open the Stays page at a representative mobile viewport.
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('https://phptravels.net/stays');
    const notice = page.getByRole('button', { name: 'I Understand & Continue' });
    if (await notice.isVisible().catch(() => false)) await notice.click();
    await expect(page.getByRole('button', { name: 'Search Hotels' })).toBeVisible();
    await expect(page.locator('body')).not.toHaveCSS('overflow-x', 'scroll');

    // 2. Open destination, dates, guests and rooms, and nationality controls at the mobile viewport.
    await page.locator('#st_dest_trigger').click();
    await expect(page.getByRole('textbox', { name: 'Search By City' })).toBeVisible();
    await page.getByRole('textbox', { name: 'Search By City' }).press('Escape');
    await page.getByRole('textbox', { name: 'Check-in Date' }).click();
    await expect(page.locator('body')).toContainText(/January|February|March|April|May|June|July|August|September|October|November|December/i);
    await page.keyboard.press('Escape');
    await page.locator('#st_guests_trigger').click();
    await expect(page.getByText('Adults', { exact: true })).toBeVisible();
    await page.keyboard.press('Escape');
    await page.locator('#st_nationality_trigger').click();
    await expect(page.getByPlaceholder('Search country...')).toBeVisible();
    await page.keyboard.press('Escape');

    // 3. Navigate through the Stays controls with the keyboard.
    await page.keyboard.press('Tab');
    await expect(page.locator(':focus')).toBeVisible();
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page.locator('body')).toContainText(/search|destination|date|guest|nationality/i);
  });
});
