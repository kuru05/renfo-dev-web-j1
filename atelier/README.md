# Cap Web

## À quoi sert Cap Web

Cap Web est un petit assistant conversationnel qui tourne dans le navigateur, sur le thème d'un réseau de bus et de tram fictif : il aide à aller d'un point A à un point B. Il répond avec des règles fixes, sans IA :

- « salut » (ou « bonjour »), « aide » et « test » ;
- trois arrêts du réseau : « ruisseau » et « marché » (les deux mots du binôme, réglés dans `cahier-personnel.json`) et « fontaine » ;
- « conseil » : Cap Web demande un conseil de voyage au serveur (route `/api/conseil`). Si le serveur ne répond pas, il affiche « Le serveur ne répond pas : conseil indisponible. ».

La page propose aussi un **itinéraire** : on choisit un arrêt de départ et un arrêt d'arrivée (dans les listes ou en cliquant sur le plan), et Cap Web affiche le trajet le plus rapide, étape par étape, et le met en évidence sur le plan du réseau. Le réseau est inventé : deux trams (T1 Gare – Campus, T2 Fontaine – Stade) et deux bus (12 Ruisseau – Marché, 30 Ruisseau – Université), 13 arrêts. Le temps compte 2 minutes entre deux arrêts en tram, 3 en bus, et 4 minutes par correspondance.

Il refuse les messages vides ou de plus de 280 caractères, affiche chaque message comme du texte (jamais comme du HTML), compte les caractères pendant la frappe et garde la conversation dans le navigateur après un rechargement. La page s'adapte au mobile (sous 600 px) et au thème sombre du système.

Le projet sert de support de formation : un contrat de tests (`tests/contrat/`) dit ce que Cap Web doit faire.

## Installer

Il faut Node.js 24.20 ou plus, et un terminal ouvert dans ce dossier `atelier`. Sous PowerShell, si `npm` est refusé, tapez `npm.cmd` à la place.

```powershell
node --version
npm ci
```

## Lancer

```powershell
npm start
```

Ouvrez ensuite http://127.0.0.1:3000 dans le navigateur. N'ouvrez pas `index.html` en double-cliquant dessus : sans le serveur, ni le style ni le JavaScript ne se chargent. Ctrl+C dans le terminal arrête le serveur. Pour un autre port : `$env:PORT=3001; npm start`.

## Tester

```powershell
npm test
npm run lint
npm run check:deps
```

`npm test` doit afficher `fail 0`. Tests du navigateur, facultatifs (environ 150 Mo à télécharger la première fois) :

```powershell
npx playwright install chromium
npm run test:browser
```

## Arborescence

```text
atelier/
├── public/                    ce que le navigateur reçoit
│   ├── index.html             la page : itinéraire et plan, puis la discussion
│   ├── styles.css             le style du réseau, la version mobile et le thème sombre
│   └── js/
│       ├── brain.js           le cerveau : règles de réponse et validation, sans accès à la page
│       ├── view.js            l'affichage de la discussion : l'historique en lignes de texte
│       ├── reseau.js          le réseau fictif et le calcul du meilleur trajet, sans accès à la page
│       ├── carte.js           l'affichage du plan (SVG), de la légende et des étapes du trajet
│       └── app.js             le câblage : formulaires, compteur, mémoire, version, conseil, itinéraire
├── server/
│   ├── app.js                 le serveur : fichiers publics, /version.json et /api/conseil
│   └── start.js               le démarrage sur 127.0.0.1:3000
├── tests/                     tests Node (npm test)
│   ├── contrat/               le contrat de Cap Web (cerveau et serveur)
│   ├── harnais/               les tests des scripts d'outillage
│   ├── calculerItineraire.test.js tests du calcul de trajet
│   ├── modulesCarte.test.js   le serveur sert reseau.js et carte.js
│   ├── compterMots.test.js    tests unitaires de compterMots
│   ├── estEnMajuscules.test.js tests unitaires de estEnMajuscules
│   ├── conseil.test.js        le test de la route /api/conseil
│   └── server.test.js         les tests du serveur statique
├── browser/                   tests navigateur Playwright (npm run test:browser)
├── scripts/                   outils du harnais (build statique, contrôle des dépendances)
├── SPEC.md                    la spécification, critère par critère
├── cahier-personnel.json      la limite et les deux mots du binôme
└── package.json               les commandes npm
```

## Les 3 modules de `public/js`

| Module | Rôle |
|---|---|
| `brain.js` | Le cerveau. Fonctions pures, sans accès à la page : `validateMessage(raw)` vérifie un message (texte, non vide, `LIMITE` caractères au plus, après retrait des espaces) et `replyTo(message)` choisit la réponse. La limite et les mots du binôme y sont écrits en haut. |
| `view.js` | L'affichage. `renderMessages(messages, container)` transforme l'historique en lignes `li`, en texte uniquement (`textContent`), et ne décide d'aucune réponse. |
| `reseau.js` | Le réseau. Les arrêts, les lignes et `calculerItineraire(depart, arrivee)`, qui cherche le trajet le plus court en minutes, correspondances comprises (algorithme de Dijkstra). Fonctions pures, testées dans `tests/calculerItineraire.test.js`. |
| `carte.js` | Le plan. Dessine le réseau en SVG avec `createElementNS` et `textContent`, la légende, et met le trajet en évidence. Ne calcule aucun trajet. |
| `app.js` | Le câblage. Il lit le formulaire, met à jour le compteur, appelle `brain.js` (ou `/api/conseil` pour « conseil »), met à jour l'historique (`{ role, text }`), le sauvegarde dans `localStorage`, demande l'affichage à `view.js` et affiche la version du serveur. |

## La route `/api/conseil`

`GET /api/conseil` renvoie un conseil de voyage tiré au hasard parmi trois, en JSON :

```json
{ "conseil": "Validez votre titre de transport à chaque montée, même en correspondance." }
```

Statut 200, en-tête `content-type: application/json; charset=utf-8`. Le test est dans `tests/conseil.test.js`. Pour la voir : `npm start`, puis http://127.0.0.1:3000/api/conseil.

Le serveur (`server/`) ne sert qu'une liste fixe de fichiers de `public/`, plus `/version.json` et `/api/conseil` : il ne divulgue jamais `server/`, `package.json` ni `.env`.
