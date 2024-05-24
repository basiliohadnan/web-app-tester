const { test, expect } = require('@playwright/test');

test('Navigate, open product, add to cart, and check cart', async ({ page }) => {
  var url = "https://www.amazon.com.br/";

  await page.goto(url, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.9999.99 Safari/537.36' } });

  // click on "Ideias de Presente"
  await page.click('.nav-a[href="/gcx/-/gfhz/?ref_=nav_cs_giftfinder"]');

  // click on "Brinquedos"
  await page.click('#sobe_d_aw_3_6');

  // click on 4th product displayed
  var index = 4;
  await page.click(`(//div[${index}]/div/div/div[2]/div/a)[1]`);

  // add the product to cart
  await page.click('#add-to-cart-button');

  // Go to the cart
  await page.click('#nav-cart-count-container > span.nav-cart-icon.nav-sprite');

  // Check the cart
  const expectedText = 'Looney Toones Frajola';
  const selector = '//span[contains(@class, "a-truncate-cut") and text()="Looney Toones Frajola"]';

  await page.waitForSelector(selector, { state: 'visible' });
  const span = await page.locator(selector).first();
  const textContent = await span.innerText();

  expect(textContent).toBe(expectedText); // Assert the text content
});
