import { test, expect } from '@playwright/test';
/* global document, Node -- callbacks exécutés dans la page par Playwright */
// Cap Web — repères sémantiques, valables à toutes les étapes.

function surveiller(page) {
  const erreurs = [];
  page.on('pageerror', (erreur) => erreurs.push(erreur));
  return erreurs;
}

test('repères header, main et footer présents', async ({ page }) => {
  const erreurs = surveiller(page);
  await page.goto('/');
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('contentinfo')).toBeVisible();
  expect(erreurs).toHaveLength(0);
});

test('titres hiérarchisés : h1 Cap Web puis h2 Discussion', async ({ page }) => {
  const erreurs = surveiller(page);
  await page.goto('/');
  const titrePrincipal = page.getByRole('heading', { name: /cap web/i, level: 1 });
  await expect(titrePrincipal).toBeVisible();
  await expect(titrePrincipal).toContainText(/cap web/i);
  const titreDiscussion = page.getByRole('heading', { name: /discussion/i, level: 2 });
  await expect(titreDiscussion).toBeVisible();
  const ordreOk = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    const h2 = document.querySelector('h2');
    if (!h1 || !h2) return false;
    return Boolean(h1.compareDocumentPosition(h2) & Node.DOCUMENT_POSITION_FOLLOWING);
  });
  expect(ordreOk).toBe(true);
  await expect(page.locator('header h1')).toHaveCount(1);
  await expect(page.locator('main h2')).toContainText(/discussion/i);
  expect(erreurs).toHaveLength(0);
});

test('section discussion liée à son titre', async ({ page }) => {
  const erreurs = surveiller(page);
  await page.goto('/');
  await expect(page.locator('main section[aria-labelledby]')).toHaveCount(1);
  const lienOk = await page.evaluate(() => {
    const section = document.querySelector('main section[aria-labelledby]');
    if (!section) return false;
    const id = section.getAttribute('aria-labelledby');
    if (!id) return false;
    const titre = document.getElementById(id);
    return !!titre && titre.tagName === 'H2' && /discussion/i.test(titre.textContent || '');
  });
  expect(lienOk).toBe(true);
  expect(erreurs).toHaveLength(0);
});

test('zone messages, statut et version présents', async ({ page }) => {
  const erreurs = surveiller(page);
  await page.goto('/');
  await expect(page.locator('section ul#messages')).toHaveCount(1);
  await expect(page.locator('#messages')).toBeAttached();
  await expect(page.locator('#status')).toHaveAttribute('role', 'status');
  await expect(page.locator('footer #version')).toBeAttached();
  await expect(page.locator('footer #version')).toContainText(/version/i);
  expect(erreurs).toHaveLength(0);
});

test('script module app.js déclaré', async ({ page }) => {
  const erreurs = surveiller(page);
  await page.goto('/');
  await expect(page.locator('script[type="module"][src*="app.js"]')).toHaveCount(1);
  expect(erreurs).toHaveLength(0);
});
