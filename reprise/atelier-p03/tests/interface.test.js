import { test, before } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Tests rouges J1 pour Cap Web.
// Lit seulement atelier/public/index.html, sans serveur.
// Contrats de structure évidents, sans ordre d’attributs imposé.
// Ce test structurel n’est pas une preuve complète d’accessibilité.
// Le responsive sera testé au navigateur plus tard.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const cheminHtml = path.join(__dirname, '..', 'public', 'index.html');

let html = '';

before(async () => {
  html = await readFile(cheminHtml, 'utf8');
});

test('document en français avec titre et repère principal', () => {
  assert.match(html, /<html[^>]*\blang\s*=\s*["']fr["']/i, 'html lang fr attendu');
  assert.match(html, /<title>[^<]*\S[^<]*<\/title>/i, 'titre non vide attendu');
  assert.match(html, /<main[\s>]/i, 'repère main attendu');
});

test('formulaire identifié avec étiquette associée', () => {
  assert.match(html, /<form[^>]*\bid\s*=\s*["']chat-form["'][^>]*>/i, 'formulaire chat-form attendu');
  assert.match(html, /<label[^>]*\bfor\s*=\s*["']message["'][^>]*>/i, 'label associé au champ message attendu');
});

test('champ message limité et bouton Envoyer', () => {
  const balise = html.match(/<textarea[^>]*>/i)?.[0] ?? '';
  assert.ok(balise, 'textarea attendu');
  assert.match(balise, /\bid\s*=\s*["']message["']/i, 'textarea id message attendu');
  assert.match(balise, /\bmaxlength\s*=\s*["']\d+["']/i, 'maxlength attendu (la limite de votre cahier personnel)');
  assert.match(html, /<button[^>]*>[\s\S]*?Envoyer[\s\S]*?<\/button>/i, 'bouton Envoyer attendu');
});

test('liste des messages présente', () => {
  assert.match(html, /<(ul|ol)[^>]*\bid\s*=\s*["']messages["'][^>]*>/i, 'liste messages attendue');
});

test('région de statut et script module', () => {
  const statut = html.match(/<[a-zA-Z][^>]*\bid\s*=\s*["']status["'][^>]*>/i)?.[0] ?? '';
  assert.ok(statut, 'région status attendue');
  assert.match(statut, /\brole\s*=\s*["']status["']/i, 'role status attendu');
  const scripts = [...html.matchAll(/<script[^>]*>/gi)].map((m) => m[0]);
  const trouve = scripts.some((s) => /\btype\s*=\s*["']module["']/i.test(s) && /app\.js/i.test(s));
  assert.ok(trouve, 'script module vers app.js attendu');
});
