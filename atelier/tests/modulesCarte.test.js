import { test, before, after } from 'node:test';
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createApp } from '../server/app.js';

// Le serveur sert les modules de la carte du réseau.
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

for (const module of ['reseau.js', 'carte.js']) {
  test(`GET /js/${module} sert le module en JavaScript`, async () => {
    const reponse = await fetch(`${baseUrl}/js/${module}`);
    assert.equal(reponse.status, 200);
    assert.match(reponse.headers.get('content-type') ?? '', /javascript/);
  });
}
