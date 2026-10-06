# J1-03 · 💥 Ça marche… jusqu'à quand

> 🏅 Badge **Ça marche… jusqu'à quand** · ⏱ 35 min · Jour 1 « Appareillage » · Niveau N0 Subir · Checkpoint 3 sur 10

🎯 **Objectif** — Demander trois modifications, une par une, au même chat, et noter à chaque fois ce qui a cassé.

🧭 **De… à…** — D'un chatbot qui « marche » (la version 1) à un journal de régressions : trois modifications, ce qui marchait avant, ce qui a cassé, ce que vous n'aviez pas vu.

🎮 **Le défi** — Demandez chaque modification comme quelqu'un qui fait confiance : une phrase, on copie, on regarde si la nouveauté marche. Puis faites ce que l'on oublie de faire : **retestez tout ce qui marchait avant**. Astuce 13, le journal : ce qu'on a demandé, ce qui a cassé, et pourquoi on ne l'avait pas vu.

🛠 **À faire**

1. Retrouvez le chat de J1-02 : la **même conversation**, pour que le chat garde son propre code sous les yeux. Ouvrez `essais-n0/chatbot-v1.html` dans le navigateur. Si la conversation a disparu, ouvrez-en une nouvelle, collez-y le code de `chatbot-v1.html`, et écrivez-le dans le journal.
2. **La liste de contrôle.** Dans le [carnet](../carnet.md), section J1-03, écrivez ce que la version 1 fait aujourd'hui : cinq à huit comportements que vous avez **essayés** (par exemple : « Entrée envoie le message », « le bot répond sur le thème », « le message apparaît dans la liste »). C'est votre filet : elle grandira à chaque modification.
3. **Choisissez trois modifications**, une ligne chacune, dans l'ordre. Par exemple : un bouton « Effacer » qui vide la conversation ; garder les messages après rechargement de la page ; refuser un message vide. Ou les vôtres.
4. **Modification 1.** Une seule phrase au chat. Copiez le code complet dans un **nouveau** fichier, `essais-n0/chatbot-v2.html` : jamais par-dessus la version précédente.
5. Ouvrez la version 2. Testez d'abord la nouveauté (pour un rechargement, F5 dans la même page). Puis parcourez **toute** la liste de contrôle, ligne par ligne : chaque ligne est cochée, ou barrée si elle ne marche plus.
6. **Entrée du journal** (carnet, section J1-03), quatre lignes : ce que j'ai demandé (recopié) · ce qui marche maintenant · ce qui marchait avant et ne marche plus · ce que je n'avais pas vu, et comment je l'ai trouvé. « Rien n'a cassé » est une réponse possible, à condition de dire comment vous avez cherché.
7. **Modifications 2 et 3.** Même boucle, dans `chatbot-v3.html` puis `chatbot-v4.html`. Ce que la modification 1 a apporté entre dans la liste de contrôle.
8. **Chasse à l'angle mort** (5 minutes). Échangez de poste avec un voisin, ou appelez le formateur : essayez de casser la dernière version de l'autre. Un message vide, un message très long (500 caractères), un message avec `<b>gras</b>`, deux messages très rapides, un rechargement, une fenêtre réduite à 360 px de large. Ajoutez au journal ce qui a été trouvé, et par qui.
9. Deux phrases de conclusion dans le carnet : quelle modification a cassé le plus de choses, et comment l'auriez-vous su sans la liste de contrôle ?

✅ **Preuve** — cochez, ou montrez au formateur
- [ ] Le carnet contient la liste de contrôle de la version 1 (au moins cinq comportements essayés).
- [ ] Le journal compte au moins trois entrées, une par modification, chacune avec ses quatre lignes.
- [ ] Les fichiers `chatbot-v1.html` à `chatbot-v4.html` existent, une version par fichier, aucune écrasée.
- [ ] Si vous n'avez trouvé aucune régression, le journal dit comment vous avez cherché (quelles lignes, quels essais, avec qui).
- [ ] Les deux phrases de conclusion sont écrites.


🆘 **Si ça bloque**
- Le chat renvoie un morceau de code au lieu du fichier : demandez « le fichier complet, en un seul bloc ». N'assemblez pas à la main.
- Le chat a changé autre chose que ce que vous demandiez (un texte, un nom, un comportement) : c'est une régression, notez-la.
- Vous demandez au chat de réparer une régression : c'est une **nouvelle** modification, donc une nouvelle version (`chatbot-v5.html`), une nouvelle entrée du journal, et vous retestez tout.
- La page reste blanche après une modification : F12, onglet **Console**, notez le message dans le journal. C'est une régression, pas un échec de votre part.
- Sinon : votre binôme, le binôme voisin, puis le formateur, en montrant votre journal.

⭐ **Pour aller plus loin** — Rejouez votre liste de contrôle sur `chatbot-v1.html` en y ajoutant trois comportements auxquels vous n'aviez pas pensé. Le premier chatbot avait-il déjà des défauts que rien ne signalait ?

➡ **Suite** — [J1-04 · 🎲 Même prompt, autre réponse](J1-04-meme-prompt.md)
