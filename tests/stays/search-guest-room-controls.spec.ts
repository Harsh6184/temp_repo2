import { test, expect, Page } from '@playwright/test';

const staysUrl = 'https://phptravels.net/stays';
async function openStays(page: Page) { await page.goto(staysUrl); const notice = page.getByRole('button', { name: 'I Understand & Continue' }); if (await notice.isVisible().catch(() => false)) await notice.click(); }

test.describe('Stays Search Form', () => {
  test('Adjust rooms, adults, and children', async ({ page }) => {
    // 1. Open the "Guests & Rooms" selector.
    await openStays(page);
    await page.locator('#st_guests_trigger').click();
    await expect(page.getByText('Rooms', { exact: true })).toBeVisible();
    await expect(page.getByText('Adults', { exact: true })).toBeVisible();
    await expect(page.getByText('Children', { exact: true })).toBeVisible();

    // 2. Increase and decrease room, adult, and child counts.
    const addButtons = page.getByRole('button', { name: 'add' });
    const removeButtons = page.getByRole('button', { name: 'remove' });
    await addButtons.nth(0).click();
    await expect(page.locator('body')).toContainText('Room 2');
    await addButtons.nth(1).click();
    await addButtons.nth(2).click();
    await expect(page.locator('body')).toContainText('Children');
    await removeButtons.nth(1).click();
    await removeButtons.nth(2).click();
    await page.locator('#st_guests_trigger').click();
    await expect(page.locator('#st_guests_trigger')).toContainText(/Guests|Room/);

    // 3. Attempt to decrement the minimum room or adult count below the supported minimum.
    await page.locator('#st_guests_trigger').click();
    const firstRoomRemove = page.getByRole('button', { name: 'remove' }).first();
    await expect(firstRoomRemove).toBeDisabled();
    await expect(page.getByRole('button', { name: 'remove' }).nth(1)).toBeEnabled();
  });
});
