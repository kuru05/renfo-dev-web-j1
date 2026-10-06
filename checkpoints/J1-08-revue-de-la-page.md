# J1-08 · 🔎 Revue de la page

> 🏅 Badge **Revue de la page** · ⏱ 55 min · Jour 1 « Appareillage » · Niveau N1 Demander · Checkpoint 8 sur 10

🎯 **Objectif** — Juger la page que l'agent a écrite avec trois lentilles (structure HTML, clavier, écrans de 360 à 1280 px), trouver au moins trois défauts et en corriger un par une demande ciblée, preuve avant/après à l'appui.

🧭 **De… à…** — D'une page qui a l'air de marcher parce que l'agent l'a écrite (le squelette de J1-06, complété en J1-07 par trois boutons de questions qui se copient dans le champ, dans `atelier/public/`), à une revue écrite dans le [carnet](../carnet.md) : trois défauts décrits (lentille, où, comment vu) et un défaut corrigé par une seule demande, avec son avant et son après.

🎮 **Le défi** — L'agent affirme que sa page est bonne. Vous êtes le contrôle : trouvez trois façons dont elle casse, avant que quelqu'un d'autre le fasse. Astuces du fil rouge : **5** (exiger des références : une affirmation sans fichier ni ligne est rejetée) et **12** (revue adverse : « trouve trois façons dont ceci casse »). Vous pratiquez aussi l'astuce 2 : un défaut, une demande, un diff relu.

🤖 **Vous ou l'agent ?**
- **Vous** : regarder, tester au clavier et à plusieurs largeurs, décider ce qui est un défaut, relire le diff, refaire la mesure après.
- **L'agent** : proposer trois façons de casser la page (étape 6), puis écrire **une** correction (étape 8).
- **Jamais** : accepter un diff que vous n'avez pas lu, ou demander en une seule fois de tout corriger.

🛠 **À faire** (durées indicatives)

Lancez la page (`npm start` depuis `atelier`, puis `http://127.0.0.1:3000`). Ouvrez la section J1-08 du carnet : un tableau « lentille · où · comment vu ». Pas d'agent avant l'étape 6 : d'abord vos yeux.

1. **Lentille 1, structure (10 min).** Dans `atelier/public/index.html` et dans l'onglet Éléments des outils du navigateur (F12), vérifiez :
   - les repères `header`, `main`, `section` et `footer` : lesquels existent, lesquels manquent ? (`main` était demandé en J1-06 ; un `div` qui joue le rôle d'un repère est un défaut) ;
   - un seul `h1` (Ctrl+F sur `<h1`), puis des titres sans saut de niveau : `h1`, `h2`, jamais un `h3` juste après le `h1` ;
   - l'étiquette est liée au champ : `label for="…"` égal à l'`id` du champ. Test : cliquez sur le texte de l'étiquette, le curseur entre dans le champ. Un `placeholder` seul n'est pas une étiquette ;
   - la liste des messages est une vraie liste (`ul` et `li`) qui a un nom (`aria-label` ou un titre qui la nomme), et un seul élément `#status` porte `role="status"` ;
   - `lang="fr"`, `title` et `viewport` sont encore présents dans le `head` ;
   - un seul bouton s'appelle « Envoyer » : les boutons de questions de J1-07 n'utilisent pas ce mot (le contrat de demain cherche le bouton par son nom).
2. **Lentille 2, clavier (8 min).** Posez la souris. Rechargez, puis :
   - Tab atteint le champ, le bouton Envoyer, puis les trois boutons de questions, dans un ordre logique, sans piège ni arrêt inutile ;
   - le focus se voit sur le champ **et** sur chaque bouton (un `outline: none` dans `styles.css` sans remplaçant est un défaut) ;
   - Entrée dans le champ : notez ce qui se passe (avec un `textarea`, une nouvelle ligne) ; Tab jusqu'à Envoyer puis Entrée : le statut « Interface prête. » (demandé en J1-06) s'affiche, sans rechargement (si l'adresse prend `?message=…`, c'est un défaut) ;
   - Entrée ou Espace sur un bouton de question copie la question dans le champ, sans l'envoyer.
3. **Lentille 3, écrans (10 min).** Ouvrez le mode appareil (Ctrl+Maj+M) et testez 360, une largeur intermédiaire au choix, puis 1280 px :
   - aucun défilement horizontal : dans la console, `document.documentElement.scrollWidth - document.documentElement.clientWidth` doit valoir `0` ;
   - le champ est entier, le bouton Envoyer visible et les trois boutons de questions lisibles, sans défiler ;
   - **le mot très long** : la liste est encore vide (les messages arrivent en J1-09). Dans Éléments, clic droit sur la liste, « Edit as HTML » (« Modifier au format HTML » selon le navigateur), puis ajoutez `<li>Vous : aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</li>` (60 lettres) et refaites la mesure. Rien n'est écrit dans vos fichiers : rechargez pour l'effacer ;
   - le CSS ne cache pas un débordement avec `overflow: hidden` sur `html` ou `body`.
4. **Écrivez vos défauts** dans le tableau du carnet : lentille, où (élément ou ligne du fichier), comment vous l'avez vu. Au moins trois, de préférence dans des lentilles différentes.
5. **Moins de trois défauts ?** Faites d'abord les essais de la première ligne de « Si ça bloque », avant de passer à l'agent.
6. **Revue adverse (7 min).** Dans dsh, en lecture seule, demandez : « Tu relis `atelier/public/index.html` et `styles.css` sans rien modifier. Trouve trois façons dont la page casse (structure, clavier, écrans de 360 à 1280 px). Pour chacune : fichier et ligne, comment le voir, ce qu'on verra. Si tu n'es pas sûr, écris "je ne sais pas". » Vérifiez chaque affirmation dans le navigateur : notez « vrai », « faux » ou « sans référence, rejeté ». Une affirmation de l'agent ne compte dans vos trois défauts que si vous l'avez vue vous-mêmes.
7. **Choisissez un défaut** facile à mesurer, et notez son **avant** : une capture ou une valeur (« à 360 px, dépassement de 182 px » est un exemple de forme, pas un résultat attendu).
8. **Une demande ciblée (10 min).** Écrivez un prompt court selon les six parties de J1-06 : rôle en une ligne ; tâche unique (le problème constaté, avec la largeur ou l'élément) ; contraintes (« ne modifie que `styles.css`, pas d'`overflow: hidden` sur `html` ou `body` ») ; format de sortie (le diff, puis une phrase sur la façon de vérifier) ; contre-exemple (le défaut lui-même) ; critère d'arrêt (« quand ce seul défaut est corrigé, tu t'arrêtes »). Copiez le prompt dans le carnet.
9. **Relisez le diff avant d'accepter** : combien de fichiers, combien de lignes, un changement que vous n'avez pas demandé ? Si oui, refusez-le et dites-le à l'agent. Notez le verdict.
10. **Mesurez l'après** avec le même geste qu'à l'étape 7, notez les deux valeurs côte à côte, puis sauvegardez le fichier touché : `git add -- atelier/public/styles.css` (ou le fichier concerné), `git commit -m "J1 : correction, <le défaut>"`. Jamais `git add -A`.

✅ **Preuve** — cochez, ou montrez au formateur
- [ ] Le carnet décrit au moins trois défauts : lentille, où (élément ou fichier), comment vu.
- [ ] Un défaut est corrigé par une seule demande, dont le texte est dans le carnet, avec son avant et son après (deux captures ou deux valeurs).
- [ ] Vous avez relu le diff de la correction : nombre de fichiers et de lignes noté, changement non demandé refusé s'il y en avait un.
- [ ] La revue adverse a donné trois affirmations, chacune marquée vraie, fausse ou rejetée faute de référence.


🆘 **Si ça bloque**
- **Moins de trois défauts après les trois lentilles** : refaites les essais qui en trouvent presque toujours un : le mot de 60 lettres à 360 px ; Tab jusqu'au bouton, le focus est-il visible ? ; le clic sur l'étiquette ; l'ordre des titres ; la fenêtre à 320 px avec le texte du navigateur agrandi (Ctrl +). Si rien ne sort, montrez vos essais au formateur (page d'entraînement : à confirmer par le formateur).
- **L'agent modifie plus que demandé** : refusez le diff, puis « Ne modifie que la règle X, dans `styles.css`. »
- **L'agent affirme sans référence** : « Donne le fichier et la ligne, ou écris "je ne sais pas". »
- **La console n'accepte pas la mesure** : ouvrez l'onglet Console (F12), tapez la ligne à la main, sans les guillemets de la fiche.
- Sinon : l'[aide-mémoire](../ressources/aide-memoire.md) (titres, étiquette, empiler et couper les mots), le binôme voisin, puis le formateur, en montrant ce que vous avez essayé.

⭐ **Pour aller plus loin** (facultatif) — Corrigez un deuxième défaut, avec sa demande et son avant/après. Ou demandez à l'agent la liste des vérifications qu'il aurait dû faire avant de vous dire « c'est bon », et comparez-la à la vôtre. Défis : [BONUS-defis.md](BONUS-defis.md).

➡ **Suite** — [J1-09 · 🧠 Un cerveau à règles, par prompts](J1-09-cerveau-a-regles.md)
