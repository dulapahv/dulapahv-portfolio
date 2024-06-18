import { expect, test } from "@playwright/test";

const baseURL = process.env.ENVIRONMENT_URL;

test("check if navbar with correct tag is present", async ({ page }) => {
  // Navigate to the page you want to test
  await page.goto("/");

  // Check if the navbar with aria-label="Navbar" is present
  const navbar = await page.locator('nav[aria-label="Navbar"]');
  await expect(navbar).toBeVisible();

  if (navbar) {
    const tagName = await navbar.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe("nav");
  }
});

test("go to experience page", async ({ page }) => {
  // Navigate to the page you want to test
  await page.goto('/');

  // Locate the navbar with aria-label="Navbar" and tag <nav>
  const navbar = page.locator('nav[aria-label="Navbar"]');
  await expect(navbar).toBeVisible();

  // Check if each element of the navbar contains an "a" button with href="/experience"
  const anchor = navbar.locator('a[href="/experience"]');
  await expect(anchor).toBeVisible();

  // Click the anchor button and verify the URL
  await anchor.click();
  await expect(page).toHaveURL(`${baseURL}/experience`);
});
