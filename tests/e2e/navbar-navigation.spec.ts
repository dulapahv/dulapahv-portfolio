import { expect, test } from "@playwright/test";

test("check if navbar with correct tag is present", async ({ page }) => {
  // Navigate to the page you want to test
  await page.goto("/");

  // Check if the navbar with aria-label="Navbar" is present
  const navbar = await page.getByRole("tablist", { name: "Navbar" });
  await expect(navbar).toBeVisible();

  if (navbar) {
    const tagName = await navbar.evaluate((el) => el.tagName.toLowerCase());
    expect(tagName).toBe("nav");
  }
});

test("go to experience page", async ({ page }) => {
  // Navigate to the page you want to test
  await page.goto("/");

  // Locate the navbar with aria-label="Navbar" and tag <nav>
  const navbar = page.locator('nav[aria-label="Navbar"]');
  await expect(navbar).toBeVisible();

  // Check if each element of the navbar contains an "a" button with href="/experience"
  const anchor = navbar.locator('a[href="/experience"]');
  await expect(anchor).toBeVisible();

  // Click the anchor button and verify the URL
  await anchor.click();
  await expect(page).toHaveURL("/experience");
});

test("go to project page", async ({ page }) => {
  // Navigate to the page you want to test
  await page.goto("/");

  // Locate the navbar with aria-label="Navbar" and tag <nav>
  const navbar = page.locator('nav[aria-label="Navbar"]');
  await expect(navbar).toBeVisible();

  // Check if each element of the navbar contains an "a" button with href="/project"
  const anchor = navbar.locator('a[href="/project"]');
  await expect(anchor).toBeVisible();

  // Click the anchor button and verify the URL
  await anchor.click();
  await expect(page).toHaveURL("/project");
});

test("go to blog page", async ({ page }) => {
  // Navigate to the page you want to test
  await page.goto("/");

  // Locate the navbar with aria-label="Navbar" and tag <nav>
  const navbar = page.locator('nav[aria-label="Navbar"]');
  await expect(navbar).toBeVisible();

  // Check if each element of the navbar contains an "a" button with href="/blog"
  const anchor = navbar.locator('a[href="/blog"]');
  await expect(anchor).toBeVisible();

  // Click the anchor button and verify the URL
  await anchor.click();
  await expect(page).toHaveURL("/blog");
});

test("go to stack page", async ({ page }) => {
  // Navigate to the page you want to test
  await page.goto("/");

  // Locate the navbar with aria-label="Navbar" and tag <nav>
  const navbar = page.locator('nav[aria-label="Navbar"]');
  await expect(navbar).toBeVisible();

  // Check if each element of the navbar contains an "a" button with href="/stack"
  const anchor = navbar.locator('a[href="/stack"]');
  await expect(anchor).toBeVisible();

  // Click the anchor button and verify the URL
  await anchor.click();
  await expect(page).toHaveURL("/stack");
});

test("go to contact page", async ({ page }) => {
  // Navigate to the page you want to test
  await page.goto("/");

  // Locate the navbar with aria-label="Navbar" and tag <nav>
  const navbar = page.locator('nav[aria-label="Navbar"]');
  await expect(navbar).toBeVisible();

  // Check if each element of the navbar contains an "a" button with href="/contact"
  const anchor = navbar.locator('a[href="/contact"]');
  await expect(anchor).toBeVisible();

  // Click the anchor button and verify the URL
  await anchor.click();
  await expect(page).toHaveURL("/contact");
});
