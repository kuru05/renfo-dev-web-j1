import { test, expect } from '@playwright/test';
/* global document, getComputedStyle -- callbacks exécutés dans la page */
// Cap Web J1 — formulaire accessible, compatible J2 et J3.

function surveiller(page) {
  const erreurs = [];
  page.on('pageerror', (erreur) => erreurs.push(erreur));
  return erreurs;
}

test('label associé au champ message', async ({ page }) => {
  const erreurs = surveiller(page);
  await page.goto('/');
  const champ = page.getByLabel(/votre message/i);
  await expect(champ).toBeVisible();
  await expect(champ).toHaveAttribute('id', 'message');
  await expect(page.locator('label[for="message"]')).toHaveCount(1);
  await expect(page.locator('label[for="message"]')).toContainText(/280/);
  expect(erreurs).toHaveLength(0);
});

test('champ borné : required et maxlength 280', async ({ page }) => {
  const erreurs = surveiller(page);
  await page.goto('/');
  const borne = await page.evaluate(() => {
    const el = document.querySelector('#message');
    if (!el) return null;
    return { requis: el.hasAttribute('required'), longueur: el.getAttribute('maxlength') };
  });
  expect(borne).not.toBeNull();
  expect(borne.requis).toBe(true);
  expect(borne.longueur).toBe('280');
  await expect(page.locator('#message')).toHaveAttribute('maxlength', '280');
  expect(erreurs).toHaveLength(0);
});

test('clavier : du champ au bouton avec focus visible', async ({ page }) => {
  const erreurs = surveiller(page);
  await page.goto('/');
  await page.locator('#message').click();
  await page.locator('#message').press('Tab');
  const bouton = page.getByRole('button', { name: /envoyer/i });
  await expect(bouton).toBeFocused();
  const largeur = await bouton.evaluate((el) => getComputedStyle(el).outlineWidth);
  expect(largeur).not.toBe('0px');
  const style = await bouton.evaluate((el) => getComputedStyle(el).outlineStyle);
  expect(style).not.toBe('none');
  expect(erreurs).toHaveLength(0);
});

test('envoi salut sans rechargement', async ({ page }) => {
  const erreurs = surveiller(page);
  await page.goto('/');
  const avant = page.url();
  await page.locator('html').evaluate(el => { el.dataset.temoinNavigation = 'present'; });
  await page.locator('#status').evaluate(el => { el.textContent = ''; });
  await page.locator('#message').fill('salut');
  await page.getByRole('button', { name: /envoyer/i }).click();
  expect(page.url()).toBe(avant);
  await expect.poll(async () => {
    const statut = (await page.locator('#status').textContent()) || '';
    const nombre = await page.locator('#messages li').count();
    return statut.trim().length > 0 || nombre > 0;
  }).toBe(true);
  await expect(page.locator('#chat-form')).toBeVisible();
  await expect(page.locator('html')).toHaveAttribute('data-temoin-navigation', 'present');
  await expect(page.locator('#messages')).toBeAttached();
  expect(erreurs).toHaveLength(0);
});

test('pas de régression : repères et zones toujours présents', async ({ page }) => {
  const erreurs = surveiller(page);
  await page.goto('/');
  await expect(page.getByRole('banner')).toBeVisible();
  await expect(page.getByRole('main')).toBeVisible();
  await expect(page.getByRole('contentinfo')).toBeVisible();
  await expect(page.getByRole('heading', { name: /cap web/i, level: 1 })).toBeVisible();
  await expect(page.getByRole('heading', { name: /discussion/i, level: 2 })).toBeVisible();
  await expect(page.locator('section[aria-labelledby]')).toHaveCount(1);
  await expect(page.locator('#messages')).toBeAttached();
  await expect(page.locator('#status')).toHaveAttribute('role', 'status');
  await expect(page.locator('footer #version')).toBeAttached();
  await expect(page.locator('#chat-form')).toBeVisible();
  await expect(page.locator('script[type="module"][src*="app.js"]')).toHaveCount(1);
  expect(erreurs).toHaveLength(0);
});
