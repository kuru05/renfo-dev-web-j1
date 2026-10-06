import { it } from 'node:test';
import assert from 'node:assert/strict';
import { estEnMajuscules } from '../public/js/brain.js';

it('C1 : un message tout en majuscules donne true, accents et ponctuation compris', () => {
  assert.equal(estEnMajuscules('SALUT'), true);
  assert.equal(estEnMajuscules('OÙ EST LE REFUGE ?'), true);
});

it('C2 : une seule minuscule suffit pour donner false', () => {
  assert.equal(estEnMajuscules('Salut'), false);
  assert.equal(estEnMajuscules('SALUT toi'), false);
});

it('C3 : un message sans lettre donne false', () => {
  assert.equal(estEnMajuscules('123 !'), false);
  assert.equal(estEnMajuscules(''), false);
});

it('C4 : il faut deux lettres au moins', () => {
  assert.equal(estEnMajuscules('OK'), true);
  assert.equal(estEnMajuscules('A'), false);
});

it('C5 : ce qui n’est pas du texte donne false, sans erreur', () => {
  assert.equal(estEnMajuscules(undefined), false);
  assert.equal(estEnMajuscules(null), false);
  assert.equal(estEnMajuscules(42), false);
});
