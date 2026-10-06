# J1-01 · 🧭 Équipage

> 🏅 Badge **Équipage** · ⏱ 20 min · Jour 1 « Appareillage » · Niveau N0 Subir · Checkpoint 1 sur 10

🎯 **Objectif** — Former votre binôme, fixer un thème provisoire, recevoir votre cahier personnel et lancer la page de départ de Cap Web.

🧭 **De… à…** — De deux personnes, un dossier `atelier` et une page jamais vue, à un binôme aux rôles définis, un thème provisoire avec trois questions, deux valeurs de cahier personnel recopiées dans le [carnet](../carnet.md), et la page de départ affichée à `http://127.0.0.1:3000`.

🎮 **Le défi** — Cap Web n'existe pas encore. Formez l'équipage, choisissez un cap provisoire (le thème), prenez le cahier qui vous est propre, puis faites démarrer le navire. Astuce 13 du fil rouge, « un journal de décisions » : le carnet commence ici, avec ce que vous décidez et pourquoi.

Aujourd'hui, vous n'écrirez pas le code à la main. D'abord un chat web sans outil (J1-02 à J1-04), puis un agent dans dsh dont vous relirez chaque modification (J1-05 à J1-09), puis une épreuve où chacun explique ce qui a été écrit (J1-10). Le fil de la semaine : passer de « je subis ce que l'IA génère » à « je vérifie ce que je livre ».

🛠 **À faire**
1. **Formez le binôme.** Décidez qui manipule en premier et qui vérifie. Échangez les rôles environ toutes les 20 minutes : chacun doit pouvoir expliquer le résultat. Notez les rôles de départ dans le carnet.
2. **Fixez un thème provisoire.** Dans le carnet, écrivez en une phrase à qui votre assistant pourrait servir, puis trois questions auxquelles il devrait, à terme, répondre. Choisissez un sujet sans données personnelles ni conseil médical, juridique ou financier réel. Aucune de vos trois questions ne doit contenir le mot « envoyer » : en J1-07 elles deviennent des boutons, et le contrat de J2 cherche le bouton « Envoyer » par son nom. Le formateur confirmera le thème plus tard.
3. **Recevez votre cahier personnel.** Le formateur vous remet, en privé, un cahier de deux valeurs propres à votre binôme (mode de remise à confirmer par le formateur) :
   - une **limite de caractères** pour le message (un nombre) ;
   - **deux mots** que Cap Web devra reconnaître, en plus de « salut », « aide » et « test ».

   Recopiez-les tels quels dans la section « Cahier personnel » du carnet. Vous en aurez besoin dès J1-06 (dans vos prompts), puis en J1-09 et en J1-10 ; le formateur s'en servira pour vérifier votre travail. Ne les changez pas et ne les échangez pas avec un autre binôme.
4. **Lancez la page.** Le formateur peut vous arrêter pour un mini-cours : écoutez d'abord. Dans un terminal ouvert à la racine du dossier, vérifiez `node --version` (24.20 minimum), puis lancez le serveur. Gardez ce terminal ouvert : `npm ci` n'est pas nécessaire pour lancer la page.

   ```sh
   cd atelier
   npm start
   ```

5. Ouvrez `http://127.0.0.1:3000` et regardez la page de départ, sans la modifier.
6. Ouvrez `atelier/public/index.html` dans l'éditeur, sans rien modifier, et repérez `main`, `h1` et `p#status`. Notez dans le carnet : le `p#status` est-il vide dans le HTML ? Qui écrit sa phrase ?
7. **Échangez les rôles.** L'autre personne relance le serveur à son tour (Ctrl+C puis `npm start`). Notez dans le carnet la commande, le dossier et le résultat.

✅ **Preuve** — cochez, ou montrez au formateur
- [ ] La page de départ s'affiche à `http://127.0.0.1:3000` avec son statut de départ, sur le poste où le binôme travaille (un seul atelier par binôme).
- [ ] Les rôles, le thème provisoire, les trois questions et les deux valeurs du cahier personnel sont dans le [carnet](../carnet.md).
- [ ] Vous citez sans notes les trois fichiers de la page (`index.html`, `styles.css`, `app.js`) et vous montrez `main`, `h1` et `p#status` dans `index.html`.


🆘 **Si ça bloque**
- « EADDRINUSE » : le port est déjà utilisé. Si c'est votre premier serveur, gardez-le ou arrêtez-le avec Ctrl+C avant de relancer. Sinon, notez l'erreur et demandez de l'aide, sans arrêter un processus inconnu.
- `npm start` ne trouve rien : vérifiez votre dossier courant avant d'entrer dans `atelier`.
- Windows : si PowerShell répond « l'exécution de scripts est désactivée sur ce système » dès `npm start`, tapez **une seule fois** `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`, répondez `O`, puis rouvrez le terminal : `npm`, `npx` et `dsh` marcheront ensuite. Si Windows refuse ce réglage (poste géré par l'école), tapez `npm.cmd`, `npx.cmd` et `dsh.cmd` à la place de `npm`, `npx` et `dsh`, partout dans la suite.
- La page reste blanche ou les modules ne se chargent pas : n'ouvrez pas `index.html` en double-cliquant dessus. Passez par `http://127.0.0.1:3000`, donc par le serveur.
- Votre cahier personnel n'est pas arrivé, ou une valeur est illisible : demandez-le au formateur, sans en inventer une.
- Serveur toujours bloqué après 10 minutes (Node, Git, installation) : notez le message d'erreur exact dans le carnet et faites vérifier ce point sur un poste où le serveur démarre. Le chat web de J1-02 n'en dépend pas.
- Sinon : l'[aide-mémoire](../ressources/aide-memoire.md), le binôme voisin, puis le formateur, en montrant ce que vous avez essayé et le message d'erreur exact.

⭐ **Pour aller plus loin** (facultatif) — Depuis `atelier`, lancez `npm test` : neuf tests du petit serveur, qui ne valident pas votre HTML.

```sh
# depuis atelier
npm test
```

➡ **Suite** — [J1-02 · 💬 Premier prompt](J1-02-premier-prompt.md)
