# Aide-mémoire JavaScript

Exemples dans un autre contexte (une liste de courses) : à vous de faire le lien avec Cap Web.

## Lire les erreurs

F12 → **Console** pour les erreurs (cliquez sur le fichier et la ligne), **Réseau** pour les fichiers en 404.

| Message | Cause la plus fréquente |
|---|---|
| `Cannot read properties of null` | Un `querySelector` n'a rien trouvé : identifiant différent du HTML. |
| `X is not defined` | Faute de frappe, ou fonction non importée. |
| `does not provide an export named X` | Nom importé différent du nom exporté. |
| 404 sur `favicon.ico` | Normal : l'atelier n'a pas d'icône. À ignorer. |
| 404 sur un fichier `.js` | Fichier absent de la liste blanche du serveur, ou serveur non redémarré. |
| `Unexpected token` | Parenthèse, accolade ou virgule manquante juste avant la ligne indiquée. |

`console.log(valeur)` affiche une valeur : c'est le moyen le plus rapide de vérifier une hypothèse.

## Page et événements

```js
const formulaire = document.querySelector('#ajout');
const saisie = document.querySelector('#article');

formulaire.addEventListener('submit', (event) => {
  event.preventDefault();               // pas de rechargement
  const article = saisie.value.trim();
  const ligne = document.createElement('li');
  ligne.textContent = article;          // jamais innerHTML pour un texte saisi
  document.querySelector('#courses').append(ligne);
});
```

`conteneur.replaceChildren(...elements)` remplace tout le contenu d'un coup.

## Modules

```js
// prix.js
export function totalTTC(prixHT) {
  return prixHT * 1.2;
}

// app.js
import { totalTTC } from './prix.js';
```

Le chemin commence par `./` et finit par `.js`. Dans l'atelier, chaque nouveau fichier de `public/` s'ajoute à `FICHIERS` et `TYPES` dans `server/app.js`, puis on redémarre le serveur.

## Mémoriser

```js
localStorage.setItem('courses', JSON.stringify(panier));
const brut = localStorage.getItem('courses');   // null si absent
try {
  const panierRelu = JSON.parse(brut);
} catch {
  // valeur abîmée : repartir d'un panier vide
}
```

## Tester

```js
import { it } from 'node:test';
import assert from 'node:assert/strict';
import { totalTTC } from '../public/js/prix.js';

it('ajoute 20 % de TVA', () => {
  assert.equal(totalTTC(100), 120);
});
```

`assert.equal` pour une valeur simple, `assert.deepEqual` pour un objet ou un tableau.

## Commandes

| Depuis | Commande | Rôle |
|---|---|---|
| `atelier` | `npm start` | Lancer le serveur (Ctrl+C pour l'arrêter). |
| `atelier` | `npm test` | Lancer les tests. |
| `atelier` | `npm ci` | Installer les outils (une fois), nécessaire pour `npm run lint` et les tests navigateur. |
| racine | `git status`, `git add -- atelier`, `git commit -m "…"` | Sauvegarder. Jamais `git add -A`. |

## Demander à une IA

Dans les checkpoints du matin, le chat web n'a pas d'outil ; à partir de J1-05, l'agent écrit dans `atelier` avec votre accord, et vous relisez chaque diff.

Bien : « Modifie uniquement `public/js/brain.js` : (une tâche). Contre-exemple : (un cas refusé). Réponds par le diff, puis arrête-toi. »

Bien : « Voici le message d'erreur exact et les lignes concernées. Explique-moi ce qu'il signifie. » Puis vous décidez : correction ciblée, ou refus.

Bien : « Donne le fichier et la ligne, ou écris "je ne sais pas". » (une affirmation sans référence est rejetée)

Pas bien : « Fais-moi le checkpoint J1-09. » ou « Corrige tout. » (un diff trop gros ne se relit pas)
