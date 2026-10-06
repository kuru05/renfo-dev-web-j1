# J1-09 · 🧠 Un cerveau à règles, par prompts

> 🏅 Badge **Un cerveau à règles, par prompts** · ⏱ 70 min · Jour 1 « Appareillage » · Niveau N1 Demander · Checkpoint 9 sur 10

🎯 **Objectif** — Faire construire par l'agent, en six petites demandes, un Cap Web qui répond avec des règles, rangé en trois modules et doté d'une mémoire, en relisant chaque diff.

🧭 **De… à…** — D'une page qui a un formulaire, trois boutons de questions et un statut, mais dont l'envoi ne fait rien de visible (J1-06 et J1-07), à un Cap Web qui affiche « Vous : … », refuse le message vide, répond à « salut », « bonjour », « aide », « test » et aux deux mots de votre cahier personnel, applique la limite de votre cahier, est rangé en `app.js`, `brain.js` et `view.js`, et garde sa conversation après F5.

🎮 **Le défi** — Vous n'écrivez pas le code : vous écrivez les demandes et vous relisez. Six demandes, six diffs relus, six vérifications dans le navigateur. Astuces du fil rouge : **2** (petits pas), **7** (contre-exemples dans le prompt), **1** (plan avant code, à l'étape 5) et **13** (le journal de décisions, celui de J1-07, continue).

🤖 **Vous ou l'agent ?**
- **Vous** : écrire chaque demande, relire chaque diff, vérifier dans le navigateur, noter le verdict, sauvegarder.
- **L'agent** : écrire le code, une demande à la fois, avec votre accord pour chaque écriture.
- **Jamais** : autoriser un diff que vous ne savez pas expliquer, laisser l'agent toucher à git, ou à autre chose que ce que la demande nomme.

🛠 **À faire**

**Départ.** `git status -- atelier` ne montre rien (les boutons de questions de J1-07 sont sauvegardés). Ouvrez une **nouvelle session** dans dsh, dans `atelier`. Ouvrez la section « Cahier personnel » du [carnet](../carnet.md) : vous en avez besoin dès l'étape 4.

**Le socle de chaque demande.** Écrivez chaque demande avec les parties de l'anatomie de J1-06 qui servent (tâche, contraintes, format de sortie, contre-exemple, critère d'arrêt), et copiez ces contraintes à la fin :

```text
Contraintes : ne modifie que les fichiers que je nomme. Garde ces noms : identifiants #chat-form, #message, #messages, #status, #effacer ; clé de mémoire capweb.historique ; fonctions validateMessage et replyTo (brain.js), renderMessages (view.js). Le texte reste du texte : textContent, jamais innerHTML. Aucune dépendance nouvelle. Garde le comportement des boutons de questions. Ne touche pas à git.
```

Pour chaque demande, dans cet ordre : envoyez-la, lisez ce que dsh veut écrire avant d'**autoriser une fois**, puis `git status` et `git diff` depuis la racine du paquet (un fichier nouveau n'apparaît pas dans `git diff` : ouvrez-le), vérifiez dans le navigateur, écrivez une ligne dans le journal du carnet (demande, diff, verdict), et sauvegardez si tout va bien :

```sh
git add -- atelier/public atelier/server
git commit -m "J1 : <l'étape>"
```

Refuser un diff : `git restore <fichier>`, supprimez les fichiers nouveaux non demandés, dites pourquoi à l'agent.

1. **L'envoi (10 min)**, dans `app.js`. La page ne se recharge pas à l'envoi ; la ligne `Vous : <message>` s'ajoute à `#messages` ; un message vide ou fait d'espaces est refusé avec un statut visible, sans ajouter de ligne, et le focus revient au champ ; après un envoi accepté, le champ et le statut sont vidés (le statut « Interface prête. » de J1-06 n'a plus lieu d'être). **Contre-exemple à écrire dans la demande** : `<b>gras</b>` doit s'afficher avec ses chevrons, pas en gras. Vérifiez : « salut », trois espaces, `<b>gras</b>`, puis un bouton de question suivi d'Envoyer.
2. **Le cerveau (10 min)**, nouveau fichier `brain.js`. `validateMessage(raw)` renvoie `{ ok: false, error }` (pas du texte, ou vide après retrait des espaces) ou `{ ok: true, value }` (le texte sans espaces autour, ces deux clés seulement). `replyTo(message)` renvoie une réponse pour « salut » (« bonjour » a la même), une pour « aide », une pour « test », un repli sinon, quelles que soient les majuscules et les espaces autour, jamais un texte vide. **Contre-exemple à écrire dans la demande** : « tester » ne doit pas déclencher la réponse de « test » (le message doit être exactement le mot). Aucun `document`, `window` ni `localStorage` dans ce fichier, même dans une phrase. **Cette fois la fiche vous autorise une modification de `server/`** : ajouter `js/brain.js` à `FICHIERS` et à `TYPES` dans `atelier/server/app.js`, une ligne chacun, rien d'autre. Vérifiez : redémarrez le serveur (Ctrl+C, `npm start`), lancez `npm test` (les tests du serveur restent verts), puis, dans la console de la page (F12), `(await import('/js/brain.js')).replyTo(' SALUT ')` affiche la réponse de « salut ».
3. **Brancher (7 min)**, dans `app.js`. Il importe `validateMessage` et `replyTo`, refuse avec `error`, et ajoute la ligne `Cap Web : <réponse>` après celle de « Vous : … ». Vérifiez : « salut », « BONJOUR », « aide », « test », une phrase inconnue, trois espaces, `<b>gras</b>`.
4. **Votre cahier (8 min)**, dans `brain.js`. Deux mots, chacun avec sa réponse propre (différente du repli), reconnus en majuscules comme en minuscules ; une limite de **N** caractères mesurée après retrait des espaces (N passe, N+1 est refusé, l'erreur cite la limite), avec **une seule constante** pour N. Écrivez vos valeurs de cahier dans la demande. Vérifiez vos deux mots avec des espaces autour. Repartis de la copie de reprise ? Elle porte 280 caractères en dur (libellé et `maxlength`) : ajoutez à la demande d'aligner les deux sur votre limite. Pour la limite, le `maxlength` du champ (J1-06) vous empêche de taper N+1 : testez la règle de `brain.js` dans la console, `(await import('/js/brain.js')).validateMessage('a'.repeat(N)).ok` (`true`), puis avec N+1 (`false`), votre nombre à la place de N.
5. **Ranger (12 min)**, `view.js` nouveau, `app.js` allégé. **Plan d'abord** : tapez `/plan` puis la demande, lisez le plan en cinq lignes, corrigez-le, puis seulement acceptez. `view.js` exporte `renderMessages(messages, container)` : un `li` par message (« Vous : » ou « Cap Web : »), en `textContent`, sans règle de réponse ; `app.js` garde un tableau `historique` d'objets `{ role, text }` (`role` vaut `user` ou `assistant`, pas d'autre clé), appelle `renderMessages(historique, liste)` et ne crée plus aucun `li`. Ajoutez `js/view.js` à `FICHIERS` et `TYPES` comme à l'étape 2. Vérifiez : même comportement, `/js/view.js` s'affiche, `app.js` ne contient plus de `createElement`.
6. **La mémoire (15 min)**, dans `app.js` et `index.html`. `historique` est enregistré en JSON sous `capweb.historique` à chaque envoi et relu au démarrage dans un `try/catch` (**contre-exemple** : une valeur abîmée ne doit pas faire planter la page, la conversation repart vide et le statut l'explique). Un bouton `<button type="button" id="effacer">Effacer la conversation</button>` demande confirmation (`confirm`), puis vide le tableau, la mémoire et l'affichage. Vérifiez : F5 garde la conversation ; F12, Application, Local Storage, écrivez `{pas du json` dans la clé, rechargez ; Effacer, annuler garde tout, accepter vide, y compris après F5.

✅ **Preuve** — cochez, ou montrez au formateur
- [ ] Un message envoyé donne « Vous : … » puis « Cap Web : … » ; un message vide ou d'espaces est refusé avec un statut visible ; `<b>gras</b>` s'affiche tel quel.
- [ ] « salut », « bonjour » (réponse de « salut »), « aide », « test » et vos deux mots du cahier répondent quelles que soient les majuscules et les espaces autour ; une phrase inconnue reçoit le repli.
- [ ] La limite de votre cahier est appliquée : N caractères passent, N+1 sont refusés (vu dans la console, avec votre N).
- [ ] Trois modules servis (`app.js`, `/js/brain.js`, `/js/view.js`) ; `brain.js` sans `document` ; `app.js` sans création de `li` ; conversation dans un tableau `historique`.
- [ ] F5 garde la conversation, une valeur abîmée ne casse rien, « Effacer » demande confirmation puis vide tout, même après F5.
- [ ] Le journal du carnet compte une ligne par demande, avec le verdict sur le diff.


🆘 **Si ça bloque**
- **La page se recharge, l'adresse finit par `?message=…`** : `app.js` n'a pas pu charger un module. Onglet Réseau : un 404 sur `brain.js` ou `view.js` ? La ligne manque dans `FICHIERS` ou `TYPES` de `atelier/server/app.js`, ou le serveur n'a pas été redémarré.
- **L'agent réécrit tout ou touche d'autres fichiers** : refusez, `git restore`, puis « Ne modifie que `<fichier>`. » Autoriser sans lire est le vrai échec de ce checkpoint.
- **`innerHTML` ou `document` dans `brain.js`** : c'est le contre-exemple. Demandez la correction ciblée.
- **« does not provide an export named »** : le nom importé n'est pas celui qui est exporté. Demandez à l'agent de citer les exports du fichier.
- **La liste affiche `[object HTMLLIElement]`** : les trois points de `...lignes` manquent dans `replaceChildren`.
- **`await` refusé dans la console** : ouvrez l'onglet Console (pas l'éditeur de code), ou testez par la page.
- **Atelier cassé** : la copie de reprise du [README du jour](../README.md) vous ramène à une page revue ; prévenez le formateur.
- Sinon : l'[aide-mémoire JavaScript](../ressources/aide-memoire-js.md), la [notice dsh](../ressources/dsh.md), le binôme voisin, puis le formateur.

⭐ **Pour aller plus loin** (facultatif) — Astuce 12 : demandez à l'agent « trouve trois façons dont ce cerveau casse, avec fichier et ligne », et vérifiez chacune dans la console. Défis : [BONUS-defis.md](BONUS-defis.md).

➡ **Suite** — [J1-10 · 🧪 Épreuve de l'explication](J1-10-epreuve-explication.md)
