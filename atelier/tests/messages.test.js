import { test } from 'node:test';
import assert from 'node:assert/strict';
import { estMessage } from '../public/js/brain.js';

// estMessage trie ce qui revient du stockage : seul un vrai message passe.

test('un vrai message donne true', () => {
  assert.equal(estMessage({ role: 'user', text: 'salut' }), true);
});

test('null donne false', () => {
  assert.equal(estMessage(null), false);
});

test('un rôle inconnu donne false', () => {
  assert.equal(estMessage({ role: 'pirate', text: 'salut' }), false);
});

test('un texte qui est un nombre donne false', () => {
  assert.equal(estMessage({ role: 'assistant', text: 42 }), false);
});
