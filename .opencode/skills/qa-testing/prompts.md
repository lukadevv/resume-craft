# QA Testing Skill (Playwright)

End-to-end testing for Resume Craft using Playwright.

## Installation

```bash
# Install Playwright
npm install --save-dev @playwright/test
npx playwright install chromium

# Or use existing test setup if already configured
```

## Test Structure

```
tests/
├── e2e/
│   ├── resume-form.spec.ts
│   ├── template-switching.spec.ts
│   ├── export-pdf.spec.ts
│   └── pwa.spec.ts
├── accessibility/
│   └── a11y.spec.ts
└── visual/
    └── snapshots.spec.ts
```

## Basic Test Example

```typescript
import { test, expect } from '@playwright/test';

test.describe('Resume Form', () => {
  test('should create new resume', async ({ page }) => {
    await page.goto('/resume/new');

    // Fill form fields
    await page.fill('[name="name"]', 'John Doe');
    await page.fill('[name="email"]', 'john@example.com');
    await page.fill('[name="phone"]', '+61 400 123 456');

    // Submit
    await page.click('button[type="submit"]');

    // Verify redirect to editor
    await expect(page).toHaveURL(/\/resume\/[\w-]+/);
    await expect(page.locator('h1')).toContainText('John Doe');
  });

  test('should validate email format', async ({ page }) => {
    await page.goto('/resume/new');

    await page.fill('[name="email"]', 'invalid-email');
    await page.click('button[type="submit"]');

    await expect(page.locator('[role="alert"]')).toContainText('Invalid email');
  });
});
```

## Locator Priority

Use locators in this order (most reliable first):

```typescript
// 1. Semantic - Best
await page.getByRole('button', { name: 'Save' });
await page.getByLabel('Email');
await page.getByPlaceholder('Enter your name');

// 2. Text - Good for static content
await page.getByText('Resume Created');

// 3. Test IDs - Fallback
await page.getByTestId('resume-submit-btn');

// 4. CSS - Last resort
await page.locator('.btn-primary');
```

## Resume-Specific Tests

### Resume Form Tests

```typescript
test('should persist resume data', async ({ page }) => {
  await page.goto('/resume/new');
  await page.fill('[name="name"]', 'Jane Smith');

  // Navigate away
  await page.goto('/');
  await page.goto('/resume/new');

  // Data should be preserved
  await expect(page.locator('[name="name"]')).toHaveValue('Jane Smith');
});

test('should add work experience', async ({ page }) => {
  await page.goto('/resume/edit/123');

  await page.click('button:has-text("Add Experience")');
  await page.fill('[name="experience[0].company"]', 'Tech Corp');
  await page.fill('[name="experience[0].position"]', 'Developer');
  await page.fill('[name="experience[0].startDate"]', '2020-01');
  await page.fill('[name="experience[0].endDate"]', '2023-12');

  await page.click('button:has-text("Save")');

  await expect(page.locator('text=Tech Corp')).toBeVisible();
});
```

### Template Switching Tests

```typescript
test('should switch between templates', async ({ page }) => {
  await page.goto('/resume/123');

  // Select different template
  await page.click('button:has-text("Templates")');
  await page.click('[data-template="modern"]');

  // Verify template applied
  await expect(page.locator('.resume-modern')).toBeVisible();

  // Switch again
  await page.click('[data-template="classic"]');
  await expect(page.locator('.resume-classic')).toBeVisible();
});
```

### PDF Export Tests

```typescript
test('should export resume to PDF', async ({ page }) => {
  await page.goto('/resume/123');

  // Click export
  await page.click('button:has-text("Export")');
  await page.click('button:has-text("PDF")');

  // Wait for download
  const download = await page.waitForEvent('download');
  expect(download.suggestedFilename()).toContain('resume');

  // Verify PDF content (basic check)
  const pdfBuffer = await download.path();
  expect(pdfBuffer).toBeTruthy();
});
```

## PWA Offline Tests

```typescript
test('should work offline', async ({ page }) => {
  // Go online first to load
  await page.goto('/resume/123');

  // Simulate offline
  await page.context().setOffline(true);

  // Should still work
  await expect(page.locator('text=John Doe')).toBeVisible();

  // Form should still work
  await page.fill('[name="name"]', 'Jane Doe');
  await page.click('button:has-text("Save")');

  // Should show offline indicator
  await expect(page.locator('[data-status="offline"]')).toBeVisible();
});
```

## Accessibility Testing

```typescript
import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('should have no accessibility violations', async ({ page }) => {
  await page.goto('/resume/new');

  const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

  expect(accessibilityScanResults.violations).toHaveLength(0);
});

test('should be keyboard navigable', async ({ page }) => {
  await page.goto('/resume/new');

  // Tab through form
  await page.keyboard.press('Tab');
  await expect(page.locator('[name="name"]')).toBeFocused();

  await page.keyboard.press('Tab');
  await expect(page.locator('[name="email"]')).toBeFocused();
});
```

## Best Practices

### Test Isolation

```typescript
// Each test should be independent
test('test 1', async ({ page }) => {
  // Setup in test, not in beforeEach that other tests depend on
  await page.goto('/resume/new');
  // ... test
});

// Use unique resume IDs to avoid conflicts
test('test 2', async ({ page }) => {
  await page.goto('/resume/new-unique-id');
  // ... test
});
```

### Waiting

```typescript
// Use Playwright auto-wait - don't add explicit waits
await page.click('button'); // Auto-waits for element

// For dynamic content
await expect(page.locator('.loaded-content')).toBeVisible();

// Never use
await page.waitForTimeout(1000); // Flaky!
```

### Assertions

```typescript
// Web-first assertions (auto-retry)
await expect(page.locator('h1')).toHaveText('Resume Builder');
await expect(page.locator('.error')).toBeHidden();
await expect(page.locator('.items')).toHaveCount(5);

// Soft assertions (don't fail immediately)
await expect.soft(page.locator('h1')).toHaveText('Wrong');
```

## Running Tests

```bash
# Run all tests
npm test

# Run specific file
npm test resume-form.spec.ts

# Run with UI
npx playwright test --ui

# Run with trace viewer (on failure)
npx playwright test --trace on

# Run in headed mode
npx playwright test --headed

# Run specific browser
npx playwright test --project=chromium
```

## CI Configuration

```yaml
# .github/workflows/test.yml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm install
      - run: npx playwright install --with-deps
      - run: npx playwright test
        env:
          CI: true
```

## Common Issues

| Issue          | Solution                                 |
| -------------- | ---------------------------------------- |
| Flaky tests    | Remove sleeps, use expect with auto-wait |
| Test isolation | Each test creates its own data           |
| Slow tests     | Run in parallel with `--workers`         |
| Debugging      | Use `npx playwright test --ui`           |
| CI failures    | Use `trace: 'retain-on-failure'`         |

## Visual Regression (Optional)

```typescript
import { test, expect } from '@playwright/test';

test('visual snapshot', async ({ page }) => {
  await page.goto('/resume/123');
  await expect(page).toHaveScreenshot('resume-preview.png');
});
```
