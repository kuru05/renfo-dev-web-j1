# Atelier J1 — Cap Web

Dossier technique de la journée. Toutes les commandes se lancent depuis ce dossier `atelier`. Aucun script du dossier parent n'est requis.

Documents de travail : [README du jour](../README.md) et [J1-01 Équipage](../checkpoints/J1-01-equipage.md). Avancez checkpoint par checkpoint avec les preuves indiquées. Le code de cet atelier est écrit par l'agent (dès J1-06) : vous le demandez, vous le relisez, vous l'expliquez.

## Démarrer

Prérequis : Node 24.20 minimum. Serveur Node fourni, modules ES, sans framework ni bundler. Git sert dès J1-05 (sauvegarde de chaque étape, relecture des diffs).

Depuis la racine étudiante :

```
cd atelier
npm start
```

Aucun `npm ci` requis pour démarrer. Ouvrez ensuite :

```
http://127.0.0.1:3000
```

Le dépôt Git se crée à la racine du paquet, pas dans `atelier` : le checkpoint J1-05 vous guide. Sans Git, utilisez le dossier extrait et ouvrez le README du jour.

## Vérifier

Depuis `atelier` :

```
npm test
```

9 tests serveur avec Node intégré. Ne valide pas votre HTML. Au checkpoint J1-10, vous y ajoutez `tests/brain.test.js` : ses tests vérifient le cerveau de Cap Web. Les tests du serveur rougissent si le serveur se met à servir ses propres fichiers (`server/`, `package.json`, `.env`).

Vérification complète, plus tard uniquement :

```
npm ci
npx playwright install chromium
npm run verify
```

`verify` = lint + tests serveur + 1 test navigateur. Ces contrôles vérifient le socle fourni ; les preuves de chaque checkpoint servent à vérifier votre travail HTML/CSS.

## Suite

Retournez au checkpoint en cours après chaque vérification. Notez commandes essayées et résultats dans le [carnet](../carnet.md).
