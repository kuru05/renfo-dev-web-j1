# Cap Web

## À quoi sert Cap Web

Cap Web est un petit assistant conversationnel qui tourne dans le navigateur. Il répond avec des règles fixes, sans IA : « salut » (ou « bonjour »), « aide », « test » et deux mots propres au binôme, réglés dans `cahier-personnel.json`.
Il refuse les messages vides ou trop longs, affiche chaque message comme du texte (jamais comme du HTML) et garde la conversation dans le navigateur après un rechargement.
Le projet sert de support de formation : un contrat de tests (`tests/contrat/`) dit ce que Cap Web doit faire.

## Installer et lancer

Il faut Node.js 24.20 ou plus, et un terminal ouvert dans ce dossier `atelier`. Sous PowerShell, si `npm` est refusé, tapez `npm.cmd` à la place.

```powershell
node --version
npm ci
npm start
```

Ouvrez ensuite http://127.0.0.1:3000 dans le navigateur. Ctrl+C dans le terminal arrête le serveur. Pour un autre port : `$env:PORT=3001; npm start`.

Pour vérifier le projet :

```powershell
npm test
npm run lint
npm run check:deps
```

Tests du navigateur, facultatifs (environ 150 Mo à télécharger la première fois) :

```powershell
npx playwright install chromium
npm run test:browser
```

## Les 3 modules de `public/js`

| Module | Rôle |
|---|---|
| `brain.js` | Le cerveau. Fonctions pures, sans accès à la page : `validateMessage(raw)` vérifie un message (texte, non vide, `LIMITE` caractères au plus, après retrait des espaces) et `replyTo(message)` choisit la réponse. La limite et les deux mots du binôme y sont écrits en haut. |
| `view.js` | L'affichage. `renderMessages(messages, container)` transforme l'historique en lignes `li`, en texte uniquement (`textContent`), et ne décide d'aucune réponse. |
| `app.js` | Le câblage. Il lit le formulaire, appelle `brain.js`, met à jour l'historique (`{ role, text }`), le sauvegarde dans `localStorage` et demande l'affichage à `view.js`. |

Le serveur (`server/`) ne sert qu'une liste fixe de fichiers de `public/` : il ne divulgue jamais `server/`, `package.json` ni `.env`.
