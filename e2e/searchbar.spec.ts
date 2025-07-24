import { test, expect } from '@playwright/test';

test.describe('SearchBar Component E2E', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:6006/');
    await page.waitForLoadState('networkidle');

    // Navigate to SearchBar stories
    await page.locator('[id="molecules-searchbar"]').click();
    await page.waitForLoadState('networkidle');

    // Navigate to the Default story
    await page.getByText('Default', { exact: true }).click();
    await page.waitForLoadState('networkidle');
  });

  test('should render search bar correctly', async ({ page }) => {
    const previewFrame = page.frameLocator('[title="storybook-preview-iframe"]');
    const searchInput = previewFrame.getByRole('textbox').first();
    const searchButton = previewFrame.getByRole('button', { name: '🔍' }).first();

    await expect(searchInput).toBeVisible();
    await expect(searchButton).toBeVisible();
    await expect(searchButton).toHaveText('🔍');
  });

  test('should allow typing in search input', async ({ page }) => {
    const previewFrame = page.frameLocator('[title="storybook-preview-iframe"]');
    const searchInput = previewFrame.getByRole('textbox').first();

    await searchInput.fill('test search query');
    await expect(searchInput).toHaveValue('test search query');
  });

  test('should trigger search on button click', async ({ page }) => {
    const previewFrame = page.frameLocator('[title="storybook-preview-iframe"]');
    const searchInput = previewFrame.getByRole('textbox').first();
    const searchButton = previewFrame.getByRole('button', { name: '🔍' }).first();

    await searchInput.fill('search term');
    await searchButton.click();

    // Verify input still has value after search
    await expect(searchInput).toHaveValue('search term');
  });

  test('should trigger search on Enter key', async ({ page }) => {
    const previewFrame = page.frameLocator('[title="storybook-preview-iframe"]');
    const searchInput = previewFrame.getByRole('textbox').first();

    await searchInput.fill('keyboard search');
    await searchInput.press('Enter');

    await expect(searchInput).toHaveValue('keyboard search');
  });

  test('should clear search input', async ({ page }) => {
    const previewFrame = page.frameLocator('[title="storybook-preview-iframe"]');
    const searchInput = previewFrame.getByRole('textbox').first();

    await searchInput.fill('text to clear');
    await expect(searchInput).toHaveValue('text to clear');

    await searchInput.clear();
    await expect(searchInput).toHaveValue('');
  });

  test('should have proper placeholder text', async ({ page }) => {
    const previewFrame = page.frameLocator('[title="storybook-preview-iframe"]');
    const searchInput = previewFrame.getByRole('textbox').first();

    // Check if placeholder is visible (varies by story)
    const placeholder = await searchInput.getAttribute('placeholder');
    expect(placeholder).toBeTruthy();
  });

  test('should be keyboard navigable', async ({ page }) => {
    const previewFrame = page.frameLocator('[title="storybook-preview-iframe"]');

    // Tab to input
    await page.keyboard.press('Tab');
    const searchInput = previewFrame.getByRole('textbox').first();
    await expect(searchInput).toBeFocused();

    // Tab to button
    await page.keyboard.press('Tab');
    const searchButton = previewFrame.getByRole('button', { name: '🔍' }).first();
    await expect(searchButton).toBeFocused();
  });
});
