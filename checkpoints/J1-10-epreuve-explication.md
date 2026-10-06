# J1-10 · 🧪 Épreuve de l'explication

> 🏅 Badge **Épreuve de l'explication** · ⏱ 50 min · Jour 1 « Appareillage » · Niveau N1 Demander · Checkpoint 10 sur 10

🎯 **Objectif** — Écrire à la main un premier test de `brain.js`, le voir échouer puis réussir, sauvegarder le travail, puis expliquer sans éditeur le code que l'agent a écrit et que vous avez relu.

🧭 **De… à…** — D'un Cap Web écrit par l'agent, relu diff par diff, qui marche « parce qu'on l'a vu marcher », à un Cap Web dont `brain.js` est vérifié par `npm test`, sauvegardé dans un commit, et que chacun des deux membres du binôme sait expliquer.

🎮 **Le défi** — Le code n'est pas de vous : vous l'avez demandé et relu. Astuce **3** : un test que vous n'avez jamais vu échouer ne prouve rien, alors faites-en échouer un exprès. Astuce **4** : l'agent qui a écrit le code n'écrit pas ses tests, c'est vous qui les écrivez. Puis fermez l'éditeur : c'est l'épreuve du jour. Une ligne que vous ne savez pas lire est une ligne que vous ne savez pas vérifier.

🤖 **Vous ou l'agent ?**
- **Vous** : écrire les tests, les lancer dans votre terminal, casser une règle exprès, expliquer, sauvegarder.
- **L'agent** : rien à écrire ici. Vous pouvez lui coller la sortie d'un test rouge pour qu'il l'explique. Pendant l'explication, dsh est arrêté (Ctrl+C dans son terminal).
- **Jamais** : lui demander d'écrire ou de modifier un test, ni de « faire passer » un test rouge.

🛠 **À faire**

**Ce checkpoint est obligatoire, même inachevé.** Si le temps manque pour le test, faites quand même les étapes 6 à 10 (carnet, explication, sauvegarde, remise) et notez dans le [carnet](../carnet.md) ce qui reste du test.

**Le premier test** — fichier à créer : `atelier/tests/brain.test.js` (modèle : `atelier/tests/server.test.js`).

1. En tête du fichier :

   ```js
   import { describe, it } from 'node:test';
   import assert from 'node:assert/strict';
   import { validateMessage, replyTo } from '../public/js/brain.js';
   ```

2. Écrivez au moins cinq tests :
   - une chaîne vide est refusée ;
   - `'  salut  '` est acceptée, avec `value` égal à `'salut'` ;
   - N caractères passent, N+1 sont refusés (`'a'.repeat(N + 1)`), avec **la limite de votre cahier personnel** ;
   - `replyTo('SALUT')` et `replyTo('salut')` donnent la même réponse ;
   - un des deux mots de votre cahier reçoit une réponse différente de celle d'une phrase inconnue.

   Comparez des réponses entre elles : ne recopiez pas leur texte. Le formateur pourra rejouer vos tests sur une autre version de `brain.js`.
3. Depuis `atelier` : `npm test`. Tout doit être vert.
4. **Cassez exprès** une règle : dans `brain.js`, repérez vous-mêmes la ligne de la limite et changez-la de 10, relancez `npm test` : un test doit devenir rouge. Notez dans le carnet son nom et son message exact. Réparez (`git restore atelier/public/js/brain.js` depuis la racine, ou remettez la valeur) et relancez : vert. Aucun test rouge ? Votre test de la limite ne vérifie pas ce qu'il annonce : corrigez-le.
5. Facultatif : `npm ci` (une seule fois, une à deux minutes), puis `npm run lint`.

**Le bilan et l'explication**

6. **Carnet (chacun, environ 8 min).** Complétez le [carnet](../carnet.md) avec vos mots, y compris pour les checkpoints inachevés.
7. **Épreuve de l'explication.** Éditeur fermé, dsh arrêté, chacun explique au **formateur**, à tour de rôle, `app.js` puis `brain.js`, ligne par ligne : ce que la ligne fait, ce qu'on verrait si on la retirait, et pourquoi vous avez accepté ce diff (votre journal de J1-09). **Le formateur choisit les lignes** dans votre code. Pendant que l'autre passe, notez dans le carnet ce que vous auriez su ou pas expliquer.
8. **Sauvegarde (binôme).** Depuis la racine du paquet (jamais `git add -A`) :

   ```sh
   git add -- atelier
   git commit -m "J1 : Cap Web répond"
   ```

9. **Copie pour la suite.** Gardez un ZIP de `atelier` sans `node_modules`, ou le dépôt du binôme si le formateur vous a donné son adresse et ses droits. Ne créez pas de dépôt public de votre propre initiative.
10. **Remise.** Suivez le canal annoncé par le formateur (à confirmer). Le binôme remet son atelier et son carnet, et confirme son thème. Chacun garde ses notes d'explication personnelles.

✅ **Preuve** — cochez, ou montrez au formateur
- [ ] `npm test` est vert, avec au moins cinq tests de `brain.js` en plus de ceux du serveur, dont la limite de votre cahier.
- [ ] Vous avez vu un test rouge et vous avez noté son nom et son message exact dans le carnet.
- [ ] Éditeur fermé, chacun a expliqué `app.js` puis `brain.js` et justifié ses diffs acceptés ; ce qui n'a pas été su est noté.
- [ ] Le [carnet](../carnet.md) est complet, le travail est sauvegardé (`git log --oneline` affiche le commit) et remis par le canal annoncé.


🆘 **Si ça bloque**
- Un test qui compare un objet échoue avec `assert.equal` : deux objets de même contenu restent deux objets distincts. Utilisez `assert.deepEqual`.
- Un test complet, pour vous guider :

  ```js
  describe('validateMessage', () => {
    it('refuse une chaîne vide', () => {
      assert.equal(validateMessage('   ').ok, false);
    });
    it('nettoie les espaces', () => {
      assert.deepEqual(validateMessage('  salut  '), { ok: true, value: 'salut' });
    });
  });
  ```

- `npm test` rouge sur un test du serveur : la liste blanche de `server/app.js` est trop large ou cassée. Lisez le nom du test, puis `git diff -- atelier/server`.
- « not a git repository » : lancez `git init -b main` à la racine du paquet, puis reprenez l'étape 8. « Please tell me who you are » : `git config user.name "Prénom Nom"` et `git config user.email "vous@exemple.fr"`.
- Le dépôt du binôme refuse l'accès : vérifiez son adresse et vos droits avec le formateur. Gardez le ZIP local de l'atelier en attendant, et ne collez aucun jeton dans le carnet ni dans un chat.
- Sinon : l'[aide-mémoire JavaScript](../ressources/aide-memoire-js.md) (« Tester »), votre binôme, le binôme voisin, puis le formateur.

⭐ **Pour aller plus loin** (facultatif) — Quand tout est fini, choisissez un défi : commandes `/aide` et `/compte`, reconnaissance souple, « Cap Web réfléchit », test navigateur automatisé. La liste complète est dans [BONUS-defis.md](BONUS-defis.md).

➡ **Suite** — Fin de journée : relisez votre [carnet](../carnet.md), puis suivez les consignes de remise du [README du jour](../README.md).
