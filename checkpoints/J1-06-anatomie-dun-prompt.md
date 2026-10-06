# J1-06 · 🧱 Anatomie d'un prompt

> 🏅 Badge **Anatomie d'un prompt** · ⏱ 40 min · Jour 1 « Appareillage » · Niveau N1 Demander · Checkpoint 6 sur 10

🎯 **Objectif** — Donner la même tâche deux fois à l'agent, d'abord avec un prompt vague, ensuite avec un prompt structuré, et comparer les deux résultats avec une grille.

🧭 **De… à…** — D'un prompt d'une phrase à un prompt de six parties ; d'un résultat au hasard à un squelette de la page de Cap Web (un formulaire, une liste de messages, un statut) qui servira de base aux checkpoints suivants.

🎮 **Le défi** — Même tâche, deux prompts : l'un tient en une phrase, l'autre a les six parties que le mini-cours « prompt engineering » vient de présenter. Vous jugez avec une grille, pas avec votre impression. Astuce 7 : des contre-exemples dans le prompt. Astuce 8 : faire lister ses hypothèses à l'agent avant qu'il agisse.

| Partie du prompt | Elle dit… |
|---|---|
| Rôle | qui est l'agent |
| Tâche | ce qu'il doit faire, en une phrase |
| Contraintes | ce qu'il doit respecter (fichiers, noms, limites) |
| Format de sortie | ce qu'il rend, et dans quel ordre |
| Exemples et contre-exemples | un cas voulu, un cas refusé, avec le cas |
| Critère d'arrêt | quand il a fini, et qu'il s'arrête alors |

🤖 **Vous ou l'agent ?**
- **L'agent** liste ses hypothèses, puis écrit les trois fichiers de la page, avec votre accord à chaque écriture.
- **Vous** écrivez les deux prompts, lisez chaque demande d'autorisation (notice dsh, section 8), jugez avec la grille, sauvegardez.
- **Jamais délégué** : juger le résultat, remplir la grille, lancer un commit.
- Le résultat du prompt structuré est **la page de Cap Web sur laquelle vous travaillez ensuite** : ne le jetez pas.

🛠 **À faire**

**Départ.**
1. Dans le terminal de Git, à la racine de votre paquet : `git status -- atelier` ne doit rien montrer (sinon, sauvegardez d'abord ce que vous voulez garder). Dans dsh, ouvrez une **nouvelle session**. Si le serveur ne tourne pas, lancez `npm start` depuis `atelier` et ouvrez `http://127.0.0.1:3000`.

**Essai 1, le prompt vague.**

2. Dans le [carnet](../carnet.md), section J1-06, écrivez un prompt d'une phrase, par exemple : « Écris la page de Cap Web : un formulaire, une liste de messages et un statut. » Envoyez-le tel quel. N'autorisez une écriture que si vous savez dire quel fichier elle touche ; refusez ce qui sort de `atelier` ou touche à Git.
3. Rechargez la page. Dans le terminal de Git, lancez `git status -- atelier` (quels fichiers ont changé, lesquels sont nouveaux ?), puis `cd atelier`, `npm test`, et `cd ..` pour revenir à la racine. Remplissez la colonne « vague » de la grille. Notez dans le carnet, en trois lignes, ce que montre la page et quels fichiers ont été touchés.
4. Remettez le dossier à zéro : `git restore atelier/public/index.html atelier/public/styles.css atelier/public/js/app.js` (et tout autre fichier modifié que `git status` a listé), puis supprimez à la main les fichiers nouveaux. `git status -- atelier` doit redevenir propre. Vous ne perdez rien : vous venez de décrire ce résultat.

**Essai 2, le prompt structuré.**

5. Ouvrez une **nouvelle session** dans dsh. Écrivez dans le carnet votre prompt en six parties, sur ce modèle (remplacez ce qui est entre `<` et `>` ; votre limite de caractères est celle de la section « Cahier personnel » du carnet, recopiée en J1-01) :

   ```text
   RÔLE : Tu es développeur web. Tu écris du HTML, du CSS et du JavaScript sans bibliothèque, pour des débutants.
   TÂCHE : Écris le squelette de la page de « Cap Web », un assistant sur <votre thème> : un formulaire, une liste de messages, une ligne de statut.
   CONTRAINTES :
   - Modifie uniquement public/index.html, public/styles.css et public/js/app.js. Le serveur ne sert que ces trois fichiers : n'en crée aucun autre.
   - Garde ces identifiants : form#chat-form, textarea#message, ul#messages, p#status.
   - Le champ #message est limité à <la limite de votre cahier personnel> caractères (maxlength).
   - Le contenu de la page est dans un main. Un seul h1 (« Cap Web »), un label lié au champ, un bouton « Envoyer », p#status avec role="status", html lang="fr". Aucune bibliothèque, aucune adresse https://.
   FORMAT DE SORTIE : d'abord la liste de tes hypothèses (cinq au plus), puis tu t'arrêtes. Après mon « ok », tu écris les trois fichiers, puis tu réponds par la liste des fichiers écrits.
   EXEMPLES ET CONTRE-EXEMPLES : voulu : <button type="submit">Envoyer</button>. Refusé : <div onclick="envoyer()">Envoyer</div> (ce n'est pas un bouton) ; un fichier script.js à côté de app.js (le serveur répondrait 404).
   CRITÈRE D'ARRÊT : app.js empêche seulement le rechargement de la page à l'envoi et écrit alors « Interface prête. » dans le statut ; il n'ajoute aucun message à la liste. Quand les trois fichiers sont écrits, tu t'arrêtes.
   ```

6. Envoyez. L'agent doit lister ses hypothèses **sans rien écrire** (astuce 8). Lisez-les, corrigez-en une si elle est fausse, puis répondez « ok ». Collez la liste et votre réponse dans le carnet.
7. Autorisez les écritures comme à l'étape 2. Rechargez la page, refaites les contrôles de l'étape 3 (`git status -- atelier`, puis `npm test` depuis `atelier`), puis remplissez la colonne « structuré ».
8. **Sauvegardez** ce résultat, il est la base de la suite : `git add -- atelier`, puis `git commit -m "J1 : squelette de Cap Web (prompt structuré)"`.
9. Dans le carnet, une phrase : « Entre les deux résultats, ce qui a le plus changé, c'est… parce que la partie … de mon prompt disait… ».

**La grille** (à recopier dans le carnet ; ✔ ou ✘, et un mot d'explication) :

| Critère | Prompt vague | Prompt structuré |
|---|---|---|
| La page s'affiche sans erreur (F12, onglet Console) | | |
| Formulaire, liste et statut sont là, avec les quatre identifiants | | |
| Seuls les trois fichiers autorisés ont changé (`git status -- atelier`) | | |
| `npm test` reste vert | | |
| Aucune bibliothèque, aucune adresse `https://` | | |
| Vous savez expliquer chaque partie de la page en une phrase | | |

✅ **Preuve** — cochez, ou montrez au formateur
- [ ] Les deux prompts sont collés dans le [carnet](../carnet.md), tels que vous les avez envoyés ; le second a ses six parties.
- [ ] Les deux résultats sont décrits dans le carnet (fichiers touchés, ce que montre la page), avec, pour le second, la liste d'hypothèses de l'agent et votre réponse.
- [ ] La grille est remplie pour les deux résultats, avec au moins cinq critères.
- [ ] La page issue du prompt structuré s'affiche à `http://127.0.0.1:3000` (formulaire, liste vide, statut), et `git log --oneline` montre son commit.
- [ ] `npm test`, lancé depuis `atelier`, est vert.


🆘 **Si ça bloque**
- L'agent écrit hors de `public/`, ou crée un `script.js` : refusez l'écriture et dites-lui pourquoi, dans le chat. Seuls `index.html`, `styles.css` et `js/app.js` sont servis (liste blanche de `server/app.js`) : un autre fichier donne un 404. Pour l'essai 1, c'est une ligne de la grille.
- L'agent écrit sans avoir listé ses hypothèses : dites-lui « stop, liste d'abord tes hypothèses », et notez qu'il n'a pas suivi le format demandé.
- La page reste blanche : F12, onglet **Console** ; collez le message à l'agent. C'est un changement de plus : au checkpoint suivant, vous apprenez à le relire.
- Le résultat structuré ne vaut pas beaucoup mieux que le vague : notez-le, la grille est là pour cela.
- Sinon : votre binôme, le binôme voisin, puis le formateur, en montrant vos deux prompts.

⭐ **Pour aller plus loin** — Relancez votre prompt structuré, sans changer un mot, dans une troisième session, puis lancez `git diff -- atelier` : ce sont les écarts entre deux réponses au même prompt (astuce 6). Comparez avec ce que vous avez vu en J1-04, puis revenez à votre version commitée avec `git restore` sur les fichiers touchés.

➡ **Suite** — [J1-07 · 👣 Petits pas](J1-07-petits-pas.md)
