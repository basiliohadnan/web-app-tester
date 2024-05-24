# Web App Tester

This repository contains end-to-end tests for a web application using Playwright.

## Table of Contents
- [Introduction](#introduction)
- [Getting Started](#getting-started)
- [Running Tests](#running-tests)
- [Test Script Explanation](#test-script-explanation)
- [Dependencies](#dependencies)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project uses [Playwright](https://playwright.dev/) for automated testing of a web application. The current tests navigate to a product page, add a product to the cart, and verify the cart contents.

## Getting Started

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) installed. You can check this by running:

```bash
node -v
```

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/basiliohadnan/web-app-tester.git
   cd web-app-tester
   ```

2. Install the dependencies:
   ```bash
   npm install
   ```

### Playwright Installation

Playwright can be installed via npm:

```bash
npm install @playwright/test
```

To install the necessary browsers, run:

```bash
npx playwright install
```

## Running Tests

To run the tests, use the following command:

```bash
npx playwright test
```

## Test Script Explanation

The following script navigates to a specific product, adds it to the cart, and verifies the cart contents:

```javascript
const { test, expect } = require('@playwright/test');

test('Navigate, open product, add to cart, and check cart', async ({ page }) => {
  await page.goto('https://submarino.com.br/');

  // Navigate to the "Informática" category
  await page.getByRole('link', { name: 'Informática' }).click();
  
  // Open a product page
  await page.locator('//div[@id="wit"]//div[contains(text(), "Monitor")]').click();
  await page.waitForSelector('.product-grid-item');
  await page.click('.product-grid-item:nth-child(1)');

  // Add product to cart
  await page.waitForSelector('button.add-to-cart');
  await page.click('button.add-to-cart');

  // Go to the cart
  await page.waitForSelector('a[href="/cart"]');
  await page.click('a[href="/cart"]');

  // Check the cart
  const expectedText = 'Looney Toones Frajola';
  const selector = '//span[contains(@class, "a-truncate-cut") and text()="Looney Toones Frajola"]';

  await page.waitForSelector(selector, { state: 'visible' });
  const span = await page.locator(selector).first();
  const textContent = await span.innerText();

  expect(textContent).toBe(expectedText); // Assert the text content
});
```

### Explanation

- **Navigate to Home Page**: Opens the main page of the website.
- **Navigate to Category**: Clicks on the "Informática" category.
- **Select a Product**: Clicks on a subcategory and selects the first product.
- **Add to Cart**: Adds the selected product to the cart.
- **Verify Cart**: Checks if the product with the expected text is present in the cart.

## Dependencies

- [Playwright](https://playwright.dev/)
- Node.js

Install the necessary dependencies with:

```bash
npm install
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.