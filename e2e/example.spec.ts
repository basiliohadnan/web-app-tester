const { test, expect } = require('@playwright/test');

test('Navigate, open product, add to cart, and check cart', async ({ page }) => {
  var url = "https://www.amazon.com.br/";

  await page.goto(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.99 Safari/537.36' } });

  // click on "Ideias de Presente"
  await page.click('.nav-a[href="/gcx/-/gfhz/?ref_=nav_cs_giftfinder"]');

  // click on "Brinquedos"
  await page.click('#sobe_d_aw_3_6');

  // XPath selector for the 4th product
  const index = 4;
  const productSelector = `//div[${index}]/div/div/div[2]/div/div/div/a/span/div`;

  // Wait for the product to be visible
  await page.locator(productSelector).waitFor({ state: 'visible' });

  // Get the inner text of the 4th product
  const productText = await page.locator(productSelector).innerText();

  // Click on the product
  await page.locator(productSelector).click();

  // Add the product to cart
  await page.waitForSelector('#add-to-cart-button');
  await page.click('#add-to-cart-button');

  // Go to the cart
  await page.waitForSelector('#nav-cart-count-container > span.nav-cart-icon.nav-sprite');
  await page.click('#nav-cart-count-container > span.nav-cart-icon.nav-sprite');

  // Check the cart
  // Trim to avoid whitespace issues
  const expectedText = productText.trim(); 

  // Locate the cart item using a more robust selector if possible
  const cartItemSelector = `//span[contains(@class, "a-truncate-cut") and contains(text(), "${expectedText}")]`;

  await page.locator(cartItemSelector).waitFor({ state: 'visible' });
  const textContent = await page.locator(cartItemSelector).innerText();

  // Assert the text content
  expect(textContent.trim()).toBe(expectedText);
});