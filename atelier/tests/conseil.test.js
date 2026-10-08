import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApp } from '../server/app.js';

// Test de la route /api/conseil (J3, étape 6).
// Démarre un serveur sur un port libre, comme tests/server.test.js.

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, '..', 'public');
const VERSION_TEST = 'test-j1';

let serveur;
let baseUrl;

before(async () => {
  const app = createApp({ publicDir, version: VERSION_TEST });
  await new Promise((resolve) => {
    serveur = app.listen(0, '127.0.0.1', resolve);
  });
  const adresse = serveur.address();
  const port = typeof adresse === 'object' && adresse !== null ? adresse.port : 0;
  baseUrl = `http://127.0.0.1:${port}`;
});

after(
  () =>
    new Promise((resolve, reject) => {
      if (!serveur) {
        resolve();
        return;
      }
      serveur.close((erreur) => (erreur ? reject(erreur) : resolve()));
    }),
);

test('GET /api/conseil renvoie un conseil en JSON', async () => {
  const reponse = await fetch(`${baseUrl}/api/conseil`);
  assert.equal(reponse.status, 200);
  assert.match(reponse.headers.get('content-type') ?? '', /application\/json/);
});
