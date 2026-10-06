import { it } from 'node:test';
import assert from 'node:assert/strict';
import { compterMots } from '../public/js/brain.js';

it('C1 : compte les mots séparés par une espace', () => {
  assert.equal(compterMots('salut'), 1);
  assert.equal(compterMots('où est le refuge'), 4);
});

it('C2 : plusieurs espaces, tabulations et retours à la ligne séparent comme une seule espace', () => {
  assert.equal(compterMots('un   deux'), 2);
  assert.equal(compterMots('un\tdeux\ntrois'), 3);
});

it('C3 : les espaces autour ne comptent pas', () => {
  assert.equal(compterMots('   salut   '), 1);
});

it('C4 : le vide et les espaces seuls donnent 0', () => {
  assert.equal(compterMots(''), 0);
  assert.equal(compterMots('   '), 0);
});

it('C5 : ce qui n’est pas du texte donne 0, sans erreur', () => {
  assert.equal(compterMots(undefined), 0);
  assert.equal(compterMots(null), 0);
  assert.equal(compterMots(42), 0);
});
