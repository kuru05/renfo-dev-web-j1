# Jour 1 · Appareillage

**La promesse du jour.** Vous appareillez : en une journée, votre binôme fait naître **Cap Web**, un assistant conversationnel qui grandira jusqu'à la soutenance de jeudi, et vous passez de « je subis ce que l'IA génère » à « je vérifie ce que je livre ». Ce soir, Cap Web répond avec des règles, il est rangé en trois modules, il a sa mémoire et un premier test, et **vous deux savez expliquer chaque fichier**, même si c'est l'agent qui les a écrits.

Le parcours de la semaine monte par niveaux : N0 Subir, N1 Demander, N2 Informer, N3 Encadrer, N4 Garantir. Aujourd'hui, vous parcourez N0 et N1. « Garanti » ne se dit pas seul : ce que vous livrez est **vérifié par contrat** quand un contrôle que vous avez écrit ou réglé l'a vu échouer, puis passer.

## Les dix checkpoints

Chaque checkpoint est un petit jeu : un objectif, une preuve et un badge. Les durées sont indicatives, mini-cours non compris, et le formateur règle le rythme avec la classe.

| # | Checkpoint | Objectif | Durée |
|---|---|---|---:|
| 1 | [🧭 Équipage](checkpoints/J1-01-equipage.md) | Former le binôme, fixer un thème provisoire, recevoir votre cahier personnel, lancer Cap Web | 20 min |
| 2 | [💬 Premier prompt](checkpoints/J1-02-premier-prompt.md) | Demander un chatbot à un chat web, sans rien d'autre, et le faire tourner | 25 min |
| 3 | [💥 Ça marche… jusqu'à quand](checkpoints/J1-03-jusqua-quand.md) | Faire trois modifications par prompt et noter ce qui casse | 35 min |
| 4 | [🎲 Même prompt, autre réponse](checkpoints/J1-04-meme-prompt.md) | Relancer trois fois le même prompt et comparer | 20 min |
| 5 | [🛠 dsh en main](checkpoints/J1-05-dsh-en-main.md) | Installer dsh et le brancher sur la passerelle | 35 min |
| 6 | [🧱 Anatomie d'un prompt](checkpoints/J1-06-anatomie-dun-prompt.md) | Écrire un prompt structuré et le comparer à un prompt vague | 40 min |
| 7 | [👣 Petits pas](checkpoints/J1-07-petits-pas.md) | Découper une tâche, un changement par demande, un diff relu par étape | 35 min |
| 8 | [🔎 Revue de la page](checkpoints/J1-08-revue-de-la-page.md) | Juger la page générée : structure, clavier, écrans de 360 à 1280 px | 55 min |
| 9 | [🧠 Un cerveau à règles, par prompts](checkpoints/J1-09-cerveau-a-regles.md) | Faire construire par l'agent, en petits pas, le chatbot à règles en trois modules | 70 min |
| 10 | [🧪 Épreuve de l'explication](checkpoints/J1-10-epreuve-explication.md) | Un premier test vu rouge, puis chacun explique le code que l'agent a écrit | 50 min |

Trois temps. **Le chat web** (1 à 4, N0 Subir) : on demande, on copie, on regarde ce qui casse. **L'agent** (5 à 7, N1 Demander) : dsh, l'anatomie d'un prompt, les petits pas. **La preuve** (8 à 10, N1) : on juge, on fait construire, on explique. Les dix checkpoints totalisent 385 minutes. Après le dixième, des [défis bonus ⭐](checkpoints/BONUS-defis.md) attendent celles et ceux qui ont fini.

Vous notez votre progression, vos preuves et vos difficultés dans le [carnet de bord](carnet.md).

## Les astuces du jour

Chaque fiche dit laquelle elle pratique. Le catalogue complet de la semaine se remplit jour après jour ; aujourd'hui :

| Astuce | Où |
|---|---|
| 1 · Demander un plan avant du code | J1-07, J1-09 |
| 2 · Petits pas : un changement par demande, un diff relu | J1-07, J1-08, J1-09 |
| 3 · Test avant code, et vu rouge | J1-10 |
| 4 · Faire écrire les tests par un autre contexte que le code | J1-10 |
| 5 · Exiger « je ne sais pas » et des références | J1-05, J1-08 |
| 6 · Relancer trois fois le même prompt et comparer | J1-04 |
| 7 · Des contre-exemples dans le prompt | J1-06, J1-09 |
| 8 · Faire lister les hypothèses de l'agent | J1-06, J1-07 |
| 12 · Revue adverse : « trouve trois façons dont ceci casse » | J1-08 |
| 13 · Un journal de décisions | tout le carnet |

## Règles du jour

- **Binôme, un seul atelier.** Vous travaillez dans **un seul dossier `atelier` par binôme**. Une personne manipule, l'autre prédit, vérifie et questionne ; **échangez les rôles toutes les 20 minutes**.
- **Deux façons de travailler avec l'IA.** De J1-02 à J1-04, un chat web public, sans outil : on demande, on copie. À partir de J1-05, l'agent (dsh) écrit dans `atelier` **avec votre accord** : vous lisez chaque demande d'autorisation et chaque diff, et il ne touche jamais à Git. Dans les deux cas, ce que vous tapez part chez un fournisseur externe : considérez-le comme public.
- **Vous devez pouvoir tout expliquer.** Au dixième checkpoint, chacun explique le code de l'agent, éditeur fermé. Une ligne que vous ne savez pas lire est une ligne que vous ne savez pas vérifier.
- **Pas obligé de tout finir.** Un checkpoint n'est validé que lorsque toute sa preuve est vérifiée, sans demi-mesure. Une seule exigence : le dixième (carnet, explication, sauvegarde, remise) se fait **même inachevé**. Pendant un mini-cours, on arrête et on écoute.
- **Votre cahier personnel.** Le formateur vous le remet en J1-01 : une limite de caractères et deux mots que Cap Web devra reconnaître. Il est propre à votre binôme ; ne l'échangez pas.
- **Thème provisoire.** Le thème de votre assistant peut rester provisoire pendant la journée : le formateur confirmera le choix avant l'étape d'identité du projet, au jour 2.
- **Aucune donnée personnelle** dans vos prompts, vos exemples, vos messages ou votre carnet. **Aucune clé ni jeton, jamais**, dans un chat, un fichier, le carnet ou une capture d'écran. La clé « agent » de votre binôme vous est remise en privé par le formateur (J1-05). Ce que le formateur voit de votre usage de l'agent : la passerelle est prévue pour ne garder que des métadonnées (votre binôme, l'heure, le volume de requêtes), pas le contenu de vos prompts ; à confirmer par le formateur.
- **Trace personnelle.** Chacun peut compléter, avec ses propres mots, la section « Notes personnelles » du carnet pour préparer l'explication finale.

## Lancer l'application

Le dossier `atelier` contient le code de départ. Il faut Node **24.20 ou plus récent**. Windows : si PowerShell répond « l'exécution de scripts est désactivée sur ce système » dès `npm start`, tapez **une seule fois** `Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned`, répondez `O`, puis rouvrez le terminal : `npm`, `npx` et `dsh` marcheront ensuite. Si Windows refuse ce réglage (poste géré par l'école), tapez `npm.cmd`, `npx.cmd` et `dsh.cmd` à la place de `npm`, `npx` et `dsh`, partout dans la suite. Depuis la racine de ce paquet :

```sh
cd atelier
npm start
```

Ouvrez `http://127.0.0.1:3000`. Le serveur sert uniquement la page locale. Aucun compte, clé d'IA ou installation de dépendances n'est nécessaire pour démarrer. Le chat web de J1-02 à J1-04 ne dépend pas du serveur : si Node ou Git bloque, notez l'erreur dans le [carnet](carnet.md) et avancez sur ces checkpoints pendant que le formateur regarde votre poste.

À partir de J1-05, vous avez trois terminaux : le serveur de Cap Web, dsh, et Git à la racine du paquet.

Un `npm test` vérifie le petit serveur ; au dixième checkpoint, il vérifie aussi votre `brain.js`. Les preuves de chaque checkpoint demandent aussi de regarder la page et de l'utiliser au clavier.

**Git n'est plus facultatif.** Dès J1-05, chaque étape acceptée se sauvegarde par un commit (le checkpoint J1-05 initialise le dépôt à la racine du paquet si besoin), et chaque diff de l'agent se relit avec `git diff`. Vos essais du chat web (J1-02 à J1-04) vivent dans un dossier `essais-n0` à la racine du paquet, à côté de `atelier`.

## Atelier bloqué : la copie de reprise

Si votre page n'affiche plus le formulaire, ne perdez pas la journée : arrêtez le serveur (Ctrl+C), renommez votre `atelier` en `atelier-essai`, copiez [`reprise/atelier-p03`](reprise/atelier-p03/README.md) à la racine sous le nom `atelier`, puis relancez `npm start`. Gardez l'essai pour expliquer ce qui bloquait. Cette copie est l'équivalent du squelette de J1-06 (page structurée, formulaire accessible, liste vide, CSS responsive) : elle ne contient pas le travail de J1-07, vous reprenez donc au [checkpoint 7](checkpoints/J1-07-petits-pas.md). Prévenez le formateur.

## Remise, en fin de journée

Le canal de remise est **à confirmer par le formateur**. Il sera annoncé avant la fin de la journée.

- Chaque binôme remet son atelier et son [carnet](carnet.md) par ce canal.
- Chaque étudiant garde ses notes d'explication personnelles et peut être invité à expliquer sa contribution.
- Chaque binôme confirme son thème pour l'étape suivante.
- Le circuit de dépôt sera précisé par le formateur avant le jour 2 : ne créez pas de dépôt public de votre propre initiative.

## Besoin d'aide ? Dans cet ordre

1. Les indices de la section « Si ça bloque » du checkpoint en cours.
2. L'[aide-mémoire HTML/CSS](ressources/aide-memoire.md), l'[aide-mémoire JavaScript](ressources/aide-memoire-js.md) et, dès J1-05, la [notice dsh](ressources/dsh.md).
3. Votre binôme.
4. Le binôme voisin.
5. Le formateur, en montrant ce que vous avez essayé et le message d'erreur exact.
