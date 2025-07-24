import { test, expect } from '@playwright/test';

test.describe('Button Component E2E', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the Storybook Button component
    await page.goto('http://localhost:6006/');
    await page.waitForLoadState('networkidle');

    // Navigate to Button stories using more specific selector
    await page.locator('[id="atoms-button"]').click();
    await page.waitForLoadState('networkidle');
  });

  test('should render primary button correctly', async ({ page }) => {
    // Select the Primary story
    await page.getByText('Primary', { exact: true }).click();

    // Find the button in the preview frame
    const previewFrame = page.frameLocator('[title="storybook-preview-iframe"]');
    const button = previewFrame.getByRole('button');

    // Verify button is visible and has correct text
    await expect(button).toBeVisible();
    await expect(button).toHaveText('Button');

    // Verify button has primary styling
    await expect(button).toHaveClass(/storybook-button--primary/);
  });

  test('should render secondary button correctly', async ({ page }) => {
    // Select the Secondary story
    await page.getByText('Secondary', { exact: true }).click();

    const previewFrame = page.frameLocator('[title="storybook-preview-iframe"]');
    const button = previewFrame.getByRole('button');

    await expect(button).toBeVisible();
    await expect(button).toHaveClass(/storybook-button--secondary/);
  });

  test('should handle button clicks', async ({ page }) => {
    await page.getByText('Primary', { exact: true }).click();

    const previewFrame = page.frameLocator('[title="storybook-preview-iframe"]');
    const button = previewFrame.getByRole('button');

    // Click the button
    await button.click();

    // Verify button is still visible after click
    await expect(button).toBeVisible();
  });

  test('should render different button sizes', async ({ page }) => {
    // Test Large button
    await page.getByText('Large', { exact: true }).click();

    const previewFrame = page.frameLocator('[title="storybook-preview-iframe"]');
    const largeButton = previewFrame.getByRole('button');

    await expect(largeButton).toBeVisible();
    await expect(largeButton).toHaveClass(/storybook-button--large/);

    // Test Small button
    await page.getByText('Small', { exact: true }).click();
    const smallButton = previewFrame.getByRole('button');

    await expect(smallButton).toBeVisible();
    await expect(smallButton).toHaveClass(/storybook-button--small/);
  });

  test('should be keyboard accessible', async ({ page }) => {
    await page.getByText('Primary', { exact: true }).click();

    const previewFrame = page.frameLocator('[title="storybook-preview-iframe"]');
    const button = previewFrame.getByRole('button');

    // Tab to the button
    await page.keyboard.press('Tab');
    await expect(button).toBeFocused();

    // Press Enter to activate
    await page.keyboard.press('Enter');
    await expect(button).toBeVisible();
  });
});
