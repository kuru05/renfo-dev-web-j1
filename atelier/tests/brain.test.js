import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { validateMessage, replyTo } from '../public/js/brain.js';

// La limite du cahier personnel. Valeur provisoire : mettre ici le vrai nombre du cahier.
const N = 280;

describe('validateMessage', () => {
  it('refuse une chaîne vide ou faite d’espaces', () => {
    assert.equal(validateMessage('').ok, false);
    assert.equal(validateMessage('   ').ok, false);
  });

  it('accepte « salut » entouré d’espaces et retire les espaces', () => {
    assert.deepEqual(validateMessage('  salut  '), { ok: true, value: 'salut' });
  });

  it('accepte N caractères et refuse N + 1', () => {
    assert.equal(validateMessage('a'.repeat(N)).ok, true);
    assert.equal(validateMessage('a'.repeat(N + 1)).ok, false);
  });
});

describe('replyTo', () => {
  it('répond pareil à « SALUT » et à « salut »', () => {
    assert.equal(replyTo('SALUT'), replyTo('salut'));
  });

  it('donne à « horaires » une autre réponse qu’à une phrase inconnue', () => {
    assert.notEqual(replyTo('horaires'), replyTo('une phrase inconnue'));
  });

  it('comprend les trois questions proposées par les boutons', () => {
    const repli = replyTo('une phrase inconnue');
    assert.equal(replyTo('Combien coûte un ticket ?'), replyTo('tarifs'));
    assert.equal(replyTo('À quelle heure passe le dernier tram ?'), replyTo('horaires'));
    assert.notEqual(replyTo('Comment aller de la gare à l’université ?'), repli);
  });

  it('ne prend pas « tester » pour « test »', () => {
    assert.notEqual(replyTo('tester'), replyTo('test'));
  });
});
