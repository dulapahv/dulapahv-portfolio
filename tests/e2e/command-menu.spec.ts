import { expect, test } from '@playwright/test';

test('check if navbar with correct tag is present', async ({ page }) => {
  // Navigate to the page you want to test
  await page.goto('/');

  // Check if the navbar with aria-label="Navbar" is present
  const navbar = await page.getByRole('tablist', { name: 'Navbar' });
  await expect(navbar).toBeVisible();

  if (navbar) {
    const tagName = await navbar.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe('nav');
  }
});

test('open command menu', async ({ page }) => {
  // Navigate to the page you want to test
  await page.goto('/');

  // Check if the navbar with aria-label="Navbar" is present
  const navbar = await page.getByRole('tablist', { name: 'Navbar' });
  await expect(navbar).toBeVisible();

  // Locate the command menu button
  const commandMenuButton = page.getByLabel('Command Menu');
  await expect(commandMenuButton).toBeVisible();

  // Click the command menu button
  await commandMenuButton.click();

  // Check if the command menu modal is visible
  const commandMenu = page.getByLabel('Command Menu⌘/Ctrl KEsc');
  await expect(commandMenu).toBeVisible();
});

test('search for a command in the command menu', async ({ page }) => {
  // Navigate to the page you want to test
  await page.goto('/');

  // Check if the navbar with aria-label="Navbar" is present
  const navbar = await page.getByRole('tablist', { name: 'Navbar' });
  await expect(navbar).toBeVisible();

  // Locate the command menu button
  const commandMenuButton = page.getByLabel('Command Menu');
  await expect(commandMenuButton).toBeVisible();

  // Click the command menu button
  await commandMenuButton.click();

  // Check if the command menu modal is visible
  const commandMenu = page.getByLabel('Command Menu⌘/Ctrl KEsc');
  await expect(commandMenu).toBeVisible();

  // Locate the search input
  const searchInput = commandMenu.getByPlaceholder('What do you need?');
  await expect(searchInput).toBeVisible();

  // Type a partial command in the search input
  await searchInput.fill('exp');

  // Check if the command menu modal is still visible
  await expect(commandMenu).toBeVisible();

  // Locate the first command in the list
  const firstCommand = commandMenu.getByLabel('Experience');
  await expect(firstCommand).toBeVisible();

  // Click the first command in the list
  await firstCommand.click();

  // Check if the command menu modal is closed
  await expect(commandMenu).not.toBeVisible();

  // Check if the URL is correct
  await expect(page).toHaveURL('/experience');
});
