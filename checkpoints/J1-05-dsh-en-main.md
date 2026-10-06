# J1-05 · 🛠 dsh en main

> 🏅 Badge **dsh en main** · ⏱ 35 min · Jour 1 « Appareillage » · Niveau N1 Demander · Checkpoint 5 sur 10

🎯 **Objectif** — Installer dsh, le brancher sur la passerelle de la formation avec la clé « agent » de votre binôme, et obtenir une première réponse de l'agent, en lecture seule, sur votre dossier de travail.

🧭 **De… à…** — D'un chat web où l'on copie et colle à un agent qui lit votre dossier `atelier` et n'y change rien : dsh installé et branché, en mode Read Only, une réponse collée dans le carnet, un dossier dont vous prouvez qu'il est inchangé.

🎮 **Le défi** — Vous quittez le chat web : l'agent travaille désormais dans votre dossier, sur vos fichiers. Premier ordre : lire, rien de plus. Puis prouvez qu'il n'a rien touché, et qu'il n'a pas inventé ce qu'il dit avoir lu. Astuce 5 : exiger « je ne sais pas » et des références (ici, un chemin par fichier).

🤖 **Vous ou l'agent ?**
- **L'agent** lit votre dossier `atelier` et décrit ce qu'il y trouve. Rien d'autre aujourd'hui.
- **Vous** installez, réglez, rangez la clé, lisez la réponse, ouvrez chaque fichier cité pour la vérifier, contrôlez que rien n'a changé.
- **Jamais délégué** : la clé, l'accord donné à une écriture, tout ce qui touche à Git.
- **À savoir** : côté formateur, la passerelle est prévue pour ne garder que des métadonnées (votre binôme, le jour, le volume de requêtes), pas le contenu de vos prompts. Le formateur peut donc voir qu'une requête a eu lieu avec votre clé.

🛠 **À faire**

Les commandes sont dans la [notice dsh](../ressources/dsh.md) : recopiez-les telles quelles. Vous aurez trois terminaux : un pour le serveur de Cap Web, un pour dsh, un pour Git.

1. Demandez au formateur votre **fiche de clés**, remise en privé : l'adresse de la passerelle (`CAPWEB_IA_URL`) et la clé « agent ». Ne la photographiez pas, ne la collez ni dans un chat ni dans un fichier de `atelier`, ne l'affichez jamais sur un écran partagé.
2. **Installez dsh** : étape 1 de la notice, environ 6 minutes. Ne fermez pas ce terminal avant la fin, et faites l'étape suivante pendant ce temps.
3. **Photo de départ.** Dans un autre terminal, placez-vous à la racine de votre paquet (le dossier qui contient `README.md` et `atelier`). Lancez `git status` : si Git répond que ce n'est pas un dépôt, lancez `git init -b main` ; s'il répond déjà, n'y touchez pas. Puis :

   ```sh
   git add -- atelier
   git commit -m "J1 : point de départ avant dsh"
   git status -- atelier
   ```

   La dernière commande doit annoncer qu'il n'y a rien à valider (« nothing to commit, working tree clean »). C'est votre état de référence.
4. **Réglez dsh** : étapes 2 à 4 de la notice (le dossier `dsh-capweb`, la télémétrie coupée, `settings.yaml`, puis `.credentials.yaml` avec la clé « agent »).
5. **Premier essai** : étape 5 de la notice, depuis `atelier` : `dsh --profile headless "Reponds uniquement OK"`.
6. **Lancez l'agent** : étape 6 de la notice, `dsh web` depuis `atelier`. Choisissez `atelier` comme espace de travail ; vérifiez le modèle `capweb-ia` et le mode Read Only (`/permission`).
7. **Première consigne.** Dans une nouvelle session, envoyez :

   > Liste les fichiers de ce dossier et dis ce que fait chacun. Donne le chemin de chaque fichier. Si tu ne sais pas ce que fait un fichier, écris « je ne sais pas ». N'écris rien et ne modifie rien.

8. **Vérifiez l'agent.** Pour chaque fichier cité, ouvrez-le dans l'éditeur et écrivez dans le [carnet](../carnet.md), section J1-05, une ligne : « existe » ou « n'existe pas », description « juste » ou « fausse », et pourquoi. Notez aussi un fichier qu'il n'a pas cité.
9. **Constatez que rien n'a changé.** Dans le terminal de Git : `git status -- atelier`. Rien ne doit apparaître. Collez dans le carnet la consigne exacte et la réponse de l'agent.
10. Si le temps le permet, **voyez la barrière tenir** : demandez « Crée le fichier public/essai-dsh.txt contenant ok », refusez la demande d'autorisation qui apparaît, puis relancez `git status -- atelier` : toujours rien.

✅ **Preuve** — cochez, ou montrez au formateur
- [ ] `dsh --version` affiche `0.1.5-rc.2` ; la session est ouverte sur le dossier `atelier`, en mode **Read Only**, avec le modèle `capweb-ia`.
- [ ] La consigne et la réponse de l'agent sont collées dans le [carnet](../carnet.md), avec, pour chaque fichier cité, une ligne « existe ? description juste ? ».
- [ ] `git status -- atelier`, lancé devant le formateur, ne montre aucun fichier modifié ni nouveau.
- [ ] Aucune clé n'est visible : ni à l'écran, ni dans le carnet, ni dans `atelier`. Elle n'existe que dans `dsh-capweb/.credentials.yaml`.


🆘 **Si ça bloque**
- Une erreur de dsh (`dsh: AUTH: 401`, `INVALID_REQUEST: 400`, `TRANSPORT`, `MISSING_CREDENTIAL`…) : le tableau « Si ça bloque » de la [notice](../ressources/dsh.md) donne la cause et le remède de chacune. PowerShell refuse de lancer `dsh` : tapez `dsh.cmd`.
- Git répond « Please tell me who you are » : lancez `git config user.name "Prénom Nom"` et `git config user.email "vous@exemple.fr"` (des valeurs de fantaisie suffisent, aucune donnée personnelle réelle), puis relancez `git commit`.
- Pas de Git sur le poste : prévenez le formateur tout de suite ; Git sert ici, à J1-06, à J1-07 et à la sauvegarde de fin de journée.
- Vous avez collé la clé ailleurs qu'à l'étape 4 (chat, terminal partagé, fichier de `atelier`, capture) : prévenez le formateur, qui la coupe et vous en donne une nouvelle. Ce n'est pas une faute grave ; la cacher en serait une.
- Après 15 minutes d'installation ou de réglages sans réponse de l'agent : notez le message exact dans le carnet et appelez le formateur (notice, section 10).
- Sinon : votre binôme, le binôme voisin, puis le formateur, en montrant ce que vous avez essayé et le message d'erreur exact.

⭐ **Pour aller plus loin** — Demandez à l'agent : « Qu'est-ce que tu ne peux pas savoir de ce projet en lisant seulement ce dossier ? » Comparez sa réponse à ce que vous savez du projet (votre thème, ce que vous voulez lui faire dire).

➡ **Suite** — [J1-06 · 🧱 Anatomie d'un prompt](J1-06-anatomie-dun-prompt.md)
