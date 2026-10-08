# Conventions du projet Cap Web

Ces règles s'appliquent à toute personne et à tout agent qui modifie ce dépôt. En cas de doute, arrête-toi et pose la question avant d'écrire.

## Nommage

- Une fonction porte un verbe qui dit ce qu'elle fait : `validateMessage`, `renderMessages`, `replyTo`. Une fonction qui répond par oui ou non commence par `est` : `estEnMajuscules`.
- Une constante de réglage s'écrit en majuscules : `LIMITE`, `MOTS`, `REPONSES`. Une variable ordinaire s'écrit en camelCase et dit ce qu'elle contient (`motsConnus`, pas `liste` ni `tmp`).
- Un fichier de `public/js/` porte le nom de son rôle, en minuscules : `brain.js`, `view.js`, `app.js`. Un test porte le nom de ce qu'il teste : `tests/<fonction>.test.js`.
- Un message de commit commence par son type, puis dit ce qui change, en français : `fix:` (corrige un défaut), `feat:` (ajoute un comportement), `test:` (ajoute un test), `docs:` (documentation), `refactor:` (même comportement, code plus clair). Un commit = un changement.

## Interdits

1. Ne modifie jamais `tests/contrat/`, `browser/contrat.spec.js` ni `cahier-personnel.json`. Ne modifie pas un test existant pour le faire passer : si un test te semble faux ou bloque une demande, arrête-toi et explique pourquoi, sans toucher au test.
2. Ne change pas le comportement fixé par le contrat ou par `SPEC.md` (par exemple : « bonjour » reçoit la même réponse que « salut ») sans une décision écrite du binôme.
3. N'ajoute, ne retire et ne mets à jour aucune dépendance (`npm install`, `npm audit fix`, `package.json`, `package-lock.json`) : seules celles de `dependances-autorisees.json` sont permises, et `npm run check:deps` doit rester vert. `public/` est servi tel quel au navigateur, sans outil de build : un `import` de paquet npm y casserait la page.
4. N'écris jamais de clé, de jeton, de mot de passe ni de donnée personnelle dans un fichier du dépôt, et surtout pas dans `public/`, qui est envoyé à chaque visiteur. Une clé de « démo » reste une clé. N'affiche pas non plus un statut qui ne correspond à rien de réel (comme « IA prête »).
5. N'utilise jamais `innerHTML`, `outerHTML` ni `insertAdjacentHTML` : le texte d'un message s'affiche avec `textContent`.
6. `brain.js` ne touche pas à la page (pas de `document`, `window` ni `localStorage`), `view.js` ne décide d'aucune réponse, `app.js` ne crée pas les lignes `li`.
7. Ne touche pas à Git (pas de commit, de push, de reset) : le binôme relit chaque diff et fait lui-même ses commits.
