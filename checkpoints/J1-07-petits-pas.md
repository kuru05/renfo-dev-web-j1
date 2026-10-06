# J1-07 · 👣 Petits pas

> 🏅 Badge **Petits pas** · ⏱ 35 min · Jour 1 « Appareillage » · Niveau N1 Demander · Checkpoint 7 sur 10

🎯 **Objectif** — Découper une tâche en trois étapes, demander un seul changement par étape, relire le diff de chacune et refuser par écrit au moins un changement de l'agent.

🧭 **De… à…** — D'un squelette de page à une page qui propose vos trois questions du thème en boutons, dont un clic copie la question dans le champ : trois étapes, chacune relue, testée et sauvegardée.

🎮 **Le défi** — Un gros changement se relit mal ; trois petits se relisent en une minute chacun. Vous êtes le relecteur : l'agent propose, vous décidez. Astuce 1 : un plan avant le code. Astuce 2 : petits pas, un changement par demande, un diff relu par étape. Astuce 8 : faire lister les hypothèses. Le journal de l'astuce 13 continue : votre refus s'y écrit.

🤖 **Vous ou l'agent ?**
- **L'agent** écrit chaque changement, un par demande.
- **Vous** découpez la tâche, formulez chaque demande, lisez le diff, testez à la main, décidez d'accepter ou de refuser.
- **Jamais délégué** : le découpage, la relecture du diff, le commit, le refus.

🛠 **À faire**

La tâche : **afficher sous le formulaire vos trois questions de J1-01 en boutons ; un clic sur un bouton copie la question dans le champ, sans l'envoyer** (aucun de ces boutons ne s'appelle ni ne contient « Envoyer » : le contrat de J2 cherche le bouton « Envoyer » par son nom ; si une de vos questions contient ce mot, reformulez-la). Elle touche `atelier/public/index.html` et `atelier/public/js/app.js`, sur le squelette de J1-06.

1. Départ : `git status -- atelier` ne montre rien (le squelette de J1-06 est sauvegardé). Ouvrez une **nouvelle session** dans dsh.
2. **Plan avant code.** Dans le [carnet](../carnet.md), section J1-07, recopiez vos trois questions et écrivez **votre** découpage en trois étapes : chaque étape est un seul changement, que vous savez tester à la main en trente secondes. Proposition (vous pouvez la changer) : (1) dans `index.html` seulement, une liste de trois boutons, un par question, écrits dans le HTML ; (2) dans `app.js` seulement, un clic copie le texte du bouton dans le champ ; (3) après le clic, le curseur est dans le champ et le statut dit « Question copiée : modifiez-la ou envoyez-la. »
3. Demandez à l'agent, sans rien écrire : « Voici ma tâche et mon découpage en trois étapes : (collez-les). Liste tes hypothèses, dis si tu découperais autrement, et n'écris rien avant mon accord. » Lisez la réponse. Gardez votre découpage ou changez-le, et notez lequel et pourquoi, en une ligne.
4. **Étape 1**, une demande, un seul changement : « Étape 1 seulement : dans public/index.html, sous le formulaire, ajoute une liste ul#suggestions de trois boutons type="button", un par question : (vos trois questions). Aucun JavaScript, aucun autre fichier, aucun autre changement. » N'autorisez l'écriture que si le fichier est le bon.
5. **Relisez le diff.** Dans le terminal de Git, à la racine de votre paquet : `git status`, `git diff --stat`, puis `git diff -- atelier`. Un fichier nouveau n'apparaît pas dans `git diff` : ouvrez-le. Lisez chaque ligne `+` et `-` : est-ce demandé ? savez-vous l'expliquer ? y a-t-il autre chose (un fichier, une ligne en plus, un `onclick`, un `innerHTML`, une adresse `https://`) ?
6. Testez à la main (F5) : l'étape fait ce qu'elle dit, et rien d'autre. À l'étape 1, les trois boutons s'affichent et ne font encore rien.
7. **Décidez**, puis notez une ligne dans le carnet (ce qui a changé ; accepté ou refusé ; pourquoi) :
   - accepter : `git add -- atelier/public/index.html`, puis `git commit -m "J1 : étape 1, boutons de questions"` (on nomme les fichiers : jamais `git add -A`) ;
   - refuser, en tout ou en partie : dites à l'agent pourquoi, dans le chat, puis `git restore atelier/public/index.html` ; ou demandez-lui de retirer seulement la partie refusée (autorisez l'écriture, puis relisez le nouveau diff).
8. **Étapes 2 et 3** : même boucle, une demande, un diff relu, un test, une décision. À l'étape 2, cliquez sur un bouton : le texte arrive dans le champ et rien n'est envoyé (le statut ne change pas ; s'il change, le formulaire a été envoyé, ce qui est plus que demandé). Une étape refusée se refait avant de passer à la suivante.
9. **Votre refus écrit.** Au moins un des diffs contient un changement que vous refusez. Dans le carnet : ce que l'agent avait fait, pourquoi vous le refusez, ce que vous lui avez demandé à la place. Si vous n'avez rien à refuser, voir « Si ça bloque ».

✅ **Preuve** — cochez, ou montrez au formateur
- [ ] Le carnet contient la tâche, vos trois questions et votre découpage en trois étapes, écrit avant la première demande d'écriture.
- [ ] Trois lignes de diff relu, une par étape : ce qui a changé, accepté ou refusé, pourquoi.
- [ ] Une décision de refus écrite : le changement de l'agent, la raison, ce que vous avez demandé à la place.
- [ ] `git log --oneline` montre un commit par étape acceptée, et `git status -- atelier` ne montre rien.
- [ ] Dans la page, trois boutons portent vos trois questions ; un clic en copie une dans le champ sans l'envoyer ; le curseur est dans le champ et le statut dit que la question est copiée.


🆘 **Si ça bloque**
- L'agent a fait plus que ce que vous demandiez (du style, un commentaire, un envoi automatique, un autre fichier) : c'est le matériau de votre refus. Relisez le diff avec ces questions : ce changement était-il demandé ? savez-vous l'expliquer ? fait-il autre chose que l'étape ?
- Vous n'avez rien à refuser : c'est possible. Demandez à la fin de l'étape 3 : « Liste, sans les faire, les changements que tu aurais ajoutés en plus », refusez-en un par écrit, et dites dans le carnet que votre refus porte sur une proposition, pas sur un diff.
- `git restore` ne vous rend pas le fichier que vous attendiez : il revient au dernier commit, donc à la dernière étape acceptée. C'est voulu.
- L'agent demande à lancer Git, à installer un paquet ou à écrire hors de `public/` : refusez, et dites-lui pourquoi (notice dsh, section 8).
- Sinon : votre binôme, le binôme voisin, puis le formateur, en montrant votre diff.

⭐ **Pour aller plus loin** — Ajoutez une quatrième étape de votre choix, au même rythme : une demande, un diff relu, un test, une décision. Notez si vous avez refusé plus de choses qu'aux trois premières, et pourquoi.

➡ **Suite** — [J1-08 · 🔎 Revue de la page](J1-08-revue-de-la-page.md)
