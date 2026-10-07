import { test } from 'node:test';
import assert from 'node:assert/strict';
import { RESEAU, DUREE_CORRESPONDANCE, calculerItineraire, decrireEtape, listerArrets, resumerItineraire } from '../public/js/reseau.js';

test('un arrêt inconnu ne donne aucun trajet', () => {
  assert.equal(calculerItineraire('gare', 'atlantide'), null);
  assert.equal(calculerItineraire('atlantide', 'gare'), null);
});

test('même départ et même arrivée : aucune étape, zéro minute', () => {
  assert.deepEqual(calculerItineraire('gare', 'gare'), { etapes: [], duree: 0, correspondances: 0 });
});

test('Gare → Université : tram T1 direct, direction Campus', () => {
  const trajet = calculerItineraire('gare', 'universite');
  assert.equal(trajet.correspondances, 0);
  assert.equal(trajet.etapes.length, 1);
  assert.equal(trajet.etapes[0].ligne, 'T1');
  assert.equal(trajet.etapes[0].direction, 'campus');
  assert.deepEqual(trajet.etapes[0].arrets, ['gare', 'marche', 'hotel-de-ville', 'universite']);
  assert.equal(trajet.duree, 6);
});

test('le sens retour donne la direction de l’autre terminus', () => {
  const trajet = calculerItineraire('universite', 'gare');
  assert.equal(trajet.etapes[0].direction, 'gare');
  assert.equal(trajet.duree, calculerItineraire('gare', 'universite').duree);
});

test('Ruisseau → Fontaine : le trajet le plus rapide passe par le bus 30 puis le tram T2', () => {
  const trajet = calculerItineraire('ruisseau', 'fontaine');
  assert.deepEqual(trajet.etapes.map((e) => e.ligne), ['30', 'T2']);
  assert.equal(trajet.correspondances, 1);
  // Bus 30 : 2 tronçons de 3 min ; tram T2 : 4 tronçons de 2 min ; plus une correspondance.
  assert.equal(trajet.duree, 6 + 8 + DUREE_CORRESPONDANCE);
});

test('chaque étape commence là où la précédente s’arrête', () => {
  const trajet = calculerItineraire('moulin', 'parc');
  for (let i = 1; i < trajet.etapes.length; i += 1) {
    assert.equal(trajet.etapes[i].de, trajet.etapes[i - 1].vers);
  }
  assert.equal(trajet.etapes[0].de, 'moulin');
  assert.equal(trajet.etapes.at(-1).vers, 'parc');
});

test('tous les arrêts sont reliés entre eux', () => {
  const ids = Object.keys(RESEAU.arrets);
  for (const depart of ids) {
    for (const arrivee of ids) {
      assert.notEqual(calculerItineraire(depart, arrivee), null, `${depart} → ${arrivee}`);
    }
  }
});

test('decrireEtape et resumerItineraire écrivent le trajet en français', () => {
  const trajet = calculerItineraire('gare', 'universite');
  assert.equal(decrireEtape(trajet.etapes[0]), 'Tram T1 de Gare à Université, direction Campus (3 arrêts).');
  assert.equal(resumerItineraire(trajet, 'gare', 'universite'), 'De Gare à Université : environ 6 minutes, sans correspondance.');
  assert.equal(resumerItineraire(null, 'gare', 'atlantide'), 'Aucun trajet trouvé entre Gare et atlantide.');
});

test('listerArrets donne tous les arrêts, triés par nom', () => {
  const noms = listerArrets().map((a) => a.nom);
  assert.equal(noms.length, Object.keys(RESEAU.arrets).length);
  assert.deepEqual(noms, [...noms].sort((a, b) => a.localeCompare(b, 'fr')));
});
