import { test, expect } from '@playwright/test';
/* global document -- callbacks exécutés dans la page par Playwright */
// Cap Web — responsive 360 et 1280 px, sans débordement.

function surveiller(page) {
  const erreurs = [];
  page.on('pageerror', (erreur) => erreurs.push(erreur));
  return erreurs;
}

async function largeurSansDebordement(page) {
  return page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
}

async function verifierDansViewport(page, largeur) {
  for (const selecteur of ['#chat-form', '#message', 'button[type="submit"]']) {
    const boite = await page.locator(selecteur).boundingBox();
    expect(boite).not.toBeNull();
    expect(boite.x).toBeGreaterThanOrEqual(-1);
    expect(boite.x + boite.width).toBeLessThanOrEqual(largeur + 1);
  }
}

test('360 px : pas de débordement et formulaire visible', async ({ page }) => {
  const erreurs = surveiller(page);
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/');
  expect(await largeurSansDebordement(page)).toBeLessThanOrEqual(1);
  await verifierDansViewport(page, 360);
  expect(erreurs).toHaveLength(0);
});

test('1280 px : pas de débordement et formulaire visible', async ({ page }) => {
  const erreurs = surveiller(page);
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  expect(await largeurSansDebordement(page)).toBeLessThanOrEqual(1);
  await verifierDansViewport(page, 1280);
  expect(erreurs).toHaveLength(0);
});

test('360 px avec texte long : champ et liste sans débordement', async ({ page }) => {
  const erreurs = surveiller(page);
  await page.setViewportSize({ width: 360, height: 800 });
  await page.goto('/');
  await page.locator('#message').fill('a'.repeat(280));
  await page.evaluate(() => {
    const ul = document.querySelector('#messages');
    if (!ul) return;
    const li = document.createElement('li');
    li.textContent = 'a'.repeat(300);
    ul.append(li);
  });
  expect(await largeurSansDebordement(page)).toBeLessThanOrEqual(1);
  await verifierDansViewport(page, 360);
  expect(erreurs).toHaveLength(0);
});

test('1280 px avec texte long : champ et liste sans débordement', async ({ page }) => {
  const erreurs = surveiller(page);
  await page.setViewportSize({ width: 1280, height: 800 });
  await page.goto('/');
  await page.locator('#message').fill('a'.repeat(280));
  await page.evaluate(() => {
    const ul = document.querySelector('#messages');
    if (!ul) return;
    const li = document.createElement('li');
    li.textContent = 'a'.repeat(300);
    ul.append(li);
  });
  expect(await largeurSansDebordement(page)).toBeLessThanOrEqual(1);
  await verifierDansViewport(page, 1280);
  expect(erreurs).toHaveLength(0);
});
