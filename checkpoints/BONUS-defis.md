# ⭐ Pour aller plus loin · Défis du Jour 1

Ces défis sont des idées libres, à prendre quand le reste est fini. Le thème sombre, les couleurs et tout ce qui est cosmétique ne comptent pas.

> Facultatif, jamais nécessaire pour passer un checkpoint. À prendre quand le reste est fini, au choix.

**Règles des défis**
- Chaque défi fait une entrée dans le [carnet](../carnet.md), avec la demande faite à l'agent et le verdict sur le diff.
- Vous devez pouvoir expliquer chaque ligne, y compris celles que l'agent a écrites.
- Un défi qui touche `brain.js` vient avec un test que vous écrivez vous-mêmes (astuce 4) et que vous avez vu rouge avant de le voir vert (astuce 3).
- Chaque nouveau fichier va dans la liste blanche du serveur (`FICHIERS` et `TYPES` dans `server/app.js`)  : une ligne pour chacune des deux listes, rien d'autre dans `server/`.

## Après J1-08 · la revue

1. **Trois défauts, trois corrections** : corrigez chacun des défauts de votre revue par sa propre demande ciblée, avec son avant/après. Le cas du mot très long à 360, 1280 px et une largeur intermédiaire est le bonus **B-J1-02**.
2. **Revue adverse, deuxième tour** : demandez à l'agent « trouve trois autres façons dont la page casse », vérifiez chacune, gardez un tableau vrai / faux / sans référence.

## Après J1-09 · le cerveau

3. **Compteur** : « n / L » dans le statut pendant la frappe, L étant la limite de votre cahier.
4. **Règles rangées** : un objet exporté `regles`, dont la réponse à « aide » liste les mots connus.
5. **Deux langues** : `/lang en` bascule les réponses en anglais.
6. **Exporter** : télécharger la conversation en `.txt`.

## Après J1-10 · la qualité

7. **Commandes** : `/aide`, `/compte`, `/effacer`.
8. **Cap Web réfléchit** : réponse après une seconde (`setTimeout`), bouton désactivé, statut « Cap Web écrit… ». Que se passe-t-il si on envoie deux messages très vite ?
9. **Plus souple** : reconnaître le mot dans une phrase (« bonjour à tous ») et des synonymes. Attention : « tester » contient « test ».
10. **Gras sans danger** : `**très**` affiché en gras sans jamais utiliser `innerHTML`.
11. **Navigateur automatisé** : depuis `atelier`, `npm ci`, `npx playwright install chromium`, puis écrivez `browser/chat.spec.js` (taper « salut », envoyer, vérifier deux messages) et lancez `npm run test:browser`.
12. **Accessibilité mesurée** : un test avec `@axe-core/playwright` qui échoue s'il trouve une violation.
13. **Tout vert** : `npm run verify` (lint, tests, navigateur).
14. **Regard critique** : listez trois améliorations de `app.js` pour un projet qui doit durer un an. Demandez la même chose à l'agent et comparez : où a-t-il raison, où se trompe-t-il, et quelle référence (fichier, ligne) a-t-il donnée ?

➡ Retour : [README du jour](../README.md) · [J1-10 · 🧪 Épreuve de l'explication](J1-10-epreuve-explication.md)
