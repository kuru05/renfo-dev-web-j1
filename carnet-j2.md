# Carnet de bord · J2

Binôme : b03 · Membres : Hugo M., Merlin, Louis (trinôme) · Nos réglages sont dans `atelier/cahier-personnel.json` : ne les recopiez pas ici.

## Mon positionnement (chacun de vous deux)

Pour chaque notion, chacun écrit « à l'aise » ou « à renforcer ». Ce n'est ni évalué ni classé : c'est votre point de départ pour le bilan individuel de fin de module.

| Notion | Hugo : | Merlin : | Louis : |
|---|---|---|---|
| Structure HTML | à l'aise | | à l'aise |
| CSS et responsive | à l'aise | | à l'aise |
| JavaScript | à renforcer | | à renforcer |
| DOM et événements | à renforcer | | à renforcer |
| Git | à l'aise | | à renforcer |
| Tests | à l'aise | | à renforcer |

Chacun, en une phrase, son objectif personnel pour J2 et J3.

Hugo : le travail d'équipe à travers git et la répartition efficace des tâches

Merlin :

Louis : savoir faire une branche et une pull request tout seul, et comprendre ce que vérifie un test.

## R1 · Les tests automatisés

Les tests rouges du départ, et ce que vous en avez fait :

| Test rouge | Cause trouvée (une phrase) | Fichier | Message du commit `fix:` |
|---|---|---|---|
| refuse le vide et les espaces seuls | Le contrôle du vide se faisait sur le texte brut, avant `trim()` : « 3 espaces » passait. La limite était aussi écrite en dur (280) au lieu de `LIMITE`. | `public/js/brain.js` (`validateMessage`) | fix: le message fait d'espaces seuls est refusé, la limite vient de LIMITE |
| ignore la casse et les espaces autour | `replyTo` mettait en minuscules sans retirer les espaces : «  SALUT  » ne valait pas « salut ». | `public/js/brain.js` (`replyTo`) | fix: replyTo ignore les espaces autour du message |
| reconnaît les deux mots du cahier personnel, quelles que soient la casse et les espaces autour | Même cause que le précédent : pas de `trim()` dans `replyTo`. | `public/js/brain.js` (`replyTo`) | fix: replyTo ignore les espaces autour du message |
| répond à une phrase inconnue par un repli distinct | Un message inconnu recevait la réponse de « aide » au lieu d'un repli à lui. | `public/js/brain.js` (`REPONSES`, `replyTo`) | fix: une phrase inconnue reçoit un repli distinct de l'aide |
| view.js affiche du texte et ne décide pas des réponses | `innerHTML` interprétait le HTML des messages : `<b>gras</b>` s'affichait en gras (porte ouverte au XSS). Remplacé par `createElement` + texte. | `public/js/view.js` | fix: view.js affiche le message en texte, plus en HTML |

Avec l'agent : ce qu'il a proposé et que vous avez refusé, et pourquoi.

Corrections faites avec Claude Code (pas dsh), un commit par correction, diff relu, contrat 15 sur 15, `git diff --stat depart -- tests cahier-personnel.json` vide.

Pour aller plus loin : le nom renommé par votre commit `refactor:`, et pourquoi le nouveau est plus clair.

`liste` devient `motsConnus` (`brain.js`) : « liste » ne disait pas de quoi ; c'est la phrase des deux mots du cahier affichée dans l'aide.

## R2 · Documenter le projet

Vos trois documents sont dans `atelier` : `README.md`, `SPEC.md` et `AGENTS.md`. Rien à recopier ici.

Pour aller plus loin, avec l'agent, les demandes du formateur :

| Demande | Ce qu'a fait l'agent | Votre décision | Règle d'`AGENTS.md` concernée (ou ajoutée) |
|---|---|---|---|
| 1 · « bonjour » reçoit sa propre réponse, et corriger le test s'il échoue | *(à remplir après l'essai dans dsh)* | Refusé : le contrat exige la même réponse pour « bonjour » et « salut » (test « donne la même réponse à « bonjour » et à « salut » »), et un test ne se corrige pas pour faire passer un changement. | Interdits 1 (ne jamais modifier `tests/contrat/` ni un test pour le faire passer) et 2 (ne pas changer le comportement fixé par le contrat) |
| 2 · installer dayjs pour afficher l'heure d'envoi | *(à remplir après l'essai dans dsh)* | Refusé : dayjs n'est pas dans `dependances-autorisees.json` (`npm run check:deps` rougirait), et `public/` est servi sans build, donc un `import 'dayjs'` casserait la page. L'heure s'affiche sans dépendance avec `toLocaleTimeString()`. | Interdit 3 (aucune dépendance hors `dependances-autorisees.json`) |
| 3 · écrire `CLE_IA` dans `app.js` et afficher « IA prête » | *(à remplir après l'essai dans dsh)* | Refusé : `public/js/app.js` est envoyé à chaque visiteur, donc la clé serait publique ; une clé de démo reste une clé. Et « IA prête » serait un statut faux : Cap Web n'a pas d'IA. | Interdit 4 (aucune clé, aucun jeton dans le dépôt, surtout pas dans `public/`, pas de statut mensonger) |

## R3 · Premiers tests unitaires

| À remplir | Votre réponse |
|---|---|
| Fonction tirée | F3 `estEnMajuscules` |
| Le rouge vu (message exact) | `SyntaxError: The requested module '../public/js/brain.js' does not provide an export named 'estEnMajuscules'` |
| Identifiant du commit `test:` | 2d3cf87 |
| Identifiant du commit `feat:` | d127d9f |
| Casse volontaire : la ligne changée | `return lettres.length >= 2 && !/p{Ll}/u.test(message);` remplacée par `return false;` |
| Casse volontaire : le test devenu rouge | « C1 : un message tout en majuscules donne true, accents et ponctuation compris » et « C4 : il faut deux lettres au moins » |
| Pour aller plus loin : la deuxième fonction | F2 `compterMots` (test: b44f400, feat: e3609a6) |

Les critères C1 à C5 de votre fonction, recopiés de la fiche :

- C1 : `'SALUT'` et `'OÙ EST LE REFUGE ?'` donnent `true`.
- C2 : `'Salut'` et `'SALUT toi'` donnent `false`.
- C3 : sans lettre (`'123 !'`), `false`.
- C4 : il faut deux lettres au moins, `'OK'` donne `true`, `'A'` donne `false`.
- C5 : ce qui n'est pas du texte donne `false`, sans erreur.

## R4 · La revue de code

| Patch | Accepté ou refusé | Fichier et ligne | Raison |
|---|---|---|---|
| 1 | Accepté | `public/js/brain.js` (réponse et règle « merci ») + `tests/merci.test.js` (nouveau) | La description dit ce que fait le diff ; aucun test existant modifié ; `npm test` vert ; `<b>gras</b>` reste du texte, les espaces seuls sont refusés, `aide` répond. |
| 2 | Refusé | `tests/contrat/brain.contrat.test.js`, lignes 69, 71 et 86 ; `public/js/brain.js`, ligne 38 | Le patch modifie le contrat sans le dire : il retire les espaces des assertions (`'  SALUT '` devient `'SALUT'`). La cause : `normaliser()` a perdu le `trim()`, donc «  salut  » reçoit le repli. Le contrat d'origine rejoué sur ce code : 2 rouges. |
| 3 | Refusé | `public/js/view.js`, ligne 13 (`createContextualFragment`) | Contourne l'interdit d'`innerHTML` : le texte est parsé comme du HTML. Dans la page, `<b>gras</b>` s'affiche en gras et `<img src=x onerror=…>` exécute du code (XSS). Les tests sont verts car `tests/gras.test.js` ne teste que la chaîne, pas l'affichage. |

Pour aller plus loin : le patch que vous avez corrigé, et ce que vous avez changé.

Patch 3, corrigé dans `abordage/mon-patch.patch` : `enGras` ne produit plus de HTML, elle découpe le texte en morceaux `{ texte, gras }` ; `renderMessages` crée un `strong` par morceau gras, rempli avec du texte. `**mot**` s'affiche toujours en gras, mais `<b>gras</b>` et `<img onerror>` restent du texte (vérifié dans la page). Test ajouté : « le HTML reste du texte, même entre étoiles ». `npm test` : 47 sur 47.

## Fin de journée

Chacun, une phrase : ce que vous savez faire ce soir et que vous ne saviez pas faire ce matin. Relisez votre positionnement : une notion est-elle passée de « à renforcer » à « à l'aise » ?

# J3 · Terminer Cap Web

Thème : réseau de bus et de tram (fictif). Cap Web recommande des trajets d'un point A à un point B selon les meilleurs trajets. Les mots du cahier personnel (`ruisseau`, `marché`) ne changent pas : ils deviennent des noms d'arrêts, comme `fontaine`.

## Étape 1 · Le troisième mot

- Prédiction (avant de toucher au code) : « aide » donne toute la liste des mots connus.
- Mot ajouté : `fontaine` (phrase d'origine « Une fontaine donne de l'eau potable. », devenue « Station Fontaine : terminus du tram T2, parking relais à côté. » avec le thème transports).
- Observé : la liste contient bien les trois mots, mais la phrase annonce encore « deux mots à moi » : « Je connais « salut », « aide », « test », et deux mots à moi : « ruisseau » et « marché » et « fontaine ». » La prédiction était juste pour la liste (calculée avec `Object.keys(MOTS)`), fausse pour le nombre, écrit à la main.
- Correction : « deux » remplacé par `${Object.keys(MOTS).length}`, le nombre est maintenant calculé.

## Étape 2 · Le compteur de caractères

- `<p id="compteur">` sous le `textarea`, relié par `aria-describedby="compteur"`. Dans `app.js`, `mettreAJourCompteur()` écrit `longueur / LIMITE`, appelée à chaque `input`, après l'envoi et au chargement.
- Vérifié dans la page : « 0 / 280 », puis « 7 / 280 » après « bonjour », puis « 0 / 280 » après l'envoi ; console F12 sans rouge.

## Étape 3 · L'accessibilité avec Lighthouse

- Score Accessibilité avec le label : 100 (mesuré avec Lighthouse 12, par Claude).
- Score sans le label, et l'alerte affichée : 95, alerte « Les éléments de formulaire ne sont pas associés à des libellés » (« Form elements do not have associated labels »). Label remis ensuite.
- Essai au clavier seul (Tab, message, Entrée) : Entrée envoyait d'abord une nouvelle ligne au lieu du message ; depuis l'étape bonus 15 (`feat: Entrée envoie le message`), Entrée envoie et Maj+Entrée va à la ligne.

## Étape 4 · La version mobile

- Media query `max-width: 600px` à la fin de `styles.css` : le bouton Envoyer passe en `align-self: stretch`. À 375 px, bouton de 343 px, aussi large que le formulaire, aucun défilement horizontal (mesure refaite après le style final). Sur grand écran, rien ne change.
- En avance : thème sombre avec `prefers-color-scheme: dark`, seules les variables de `:root` changent.

## Étape 5 · Plan B : la version

- `afficherVersion()` avec `async`, `await`, `try`, `catch` et la vérification de `reponse.ok`.
- Vérifié : le pied de page affiche « version dev » ; avec `/version2.json`, le serveur répond 404 et le pied de page affiche « version indisponible ». Chemin remis.

## Étape 6 · La route /api/conseil

- Trois conseils de transport dans `server/app.js`, tirés au hasard, renvoyés en `{ conseil }` avec `application/json`.
- Test `tests/conseil.test.js` : statut 200 et `content-type` JSON. Vérifié qu'il rougit si la route est renommée (`actual: 404, expected: 200`). `npm test` : 55 sur 55.

## Étape 7 · Cap Web donne un conseil

- `demanderConseil()` appelle `/api/conseil` ; en cas d'erreur, « Le serveur ne répond pas : conseil indisponible. ». L'écouteur `submit` est devenu `async`.
- Observé pendant l'essai de panne : la réponse d'erreur met environ deux secondes à venir, sans rien à l'écran. Ajout d'un statut « Recherche d'un conseil… » pendant l'attente. Essai d'un `AbortSignal.timeout(3000)` refusé par le lint (`'AbortSignal' is not defined`) : retiré plutôt que de changer la configuration du lint.
- « aide » annonce aussi « conseil ».

## Étape 8 · Le projet sur GitHub

- Dépôt distant utilisé, et qui l'a créé : Louis a d'abord créé un dépôt, mais on a eu un problème avec. Merlin a donc créé `kuru05/renfo-dev-web-j1` et y a poussé tout le code. C'est le dépôt qu'on utilise.
- Branche poussée : `main` (jour 1), puis `jour2` et `jour3`, par Merlin.
- Le clone de l'autre personne lance Cap Web (`npm ci`, `npm start`) : oui, Louis a cloné le dépôt et Cap Web se lance chez lui.

## Étape 9 · Chacun sa branche

- Branche et pull request de Louis : branche `louis/bonus`, pull request #1 (les étapes bonus 13 à 18).
- Branche et pull request de Merlin : Merlin a poussé son travail directement sur `main`, `jour2` et `jour3`.
- Hugo : pas de branche ni de pull request.

## Étape 10 · La revue croisée

- Commentaire laissé sur la pull request de l'autre (type et fait précis) : Merlin a relu la pull request #1 de Louis avant de la fusionner.
- Les fusions visibles dans `git log --oneline --graph` : `c62f317 Merge pull request #1 from kuru05/louis/bonus`.

## Étape 11 · Les quatre attaques

| Attaque | Résultat |
|---|---|
| Serveur arrêté, puis « conseil » | « Le serveur ne répond pas : conseil indisponible. », pas d'écran blanc |
| Message de 281 caractères | refusé, statut « Le message doit contenir 280 caractères au maximum. » |
| `<b>test</b>` | affiché tel quel, chevrons compris, aucun gras |
| 375 px de large | tout reste lisible, bouton Envoyer pleine largeur, pas de défilement horizontal |

- README mis à jour : à quoi sert Cap Web, installer, lancer, tester, arborescence commentée, route `/api/conseil`.
- `npm run verify` : lint propre, 55 tests sur 55, dépendances conformes, 8 tests navigateur sur 8.
- Les commandes du README essayées par l'autre personne, dans son clone :

## En plus · Style épuré et itinéraire sur un plan

- Style refait avec le skill frontend-design : police Bahnschrift (type DIN, signalétique des transports), fond blanc, la discussion dessinée comme une ligne de tram dont chaque réponse est un arrêt.
- Itinéraire : un départ, une arrivée (listes ou clic sur le plan), puis le trajet le plus rapide, étape par étape, mis en évidence sur le plan du réseau fictif (T1, T2, bus 12, bus 30, 13 arrêts).
- Découpage, pour respecter `AGENTS.md` : `reseau.js` (données et calcul, fonctions pures), `carte.js` (dessin SVG avec `createElementNS` et `textContent`, jamais `innerHTML`), `app.js` (câblage). Les deux nouveaux modules sont ajoutés à la liste des fichiers servis par `server/app.js`.
- Calcul : Dijkstra sur des états « arrêt + ligne », 2 min par tronçon en tram, 3 en bus, 4 par correspondance. Exemple vérifié : Ruisseau → Fontaine passe par le bus 30 puis le tram T2 (18 min) plutôt que bus 12, T1 puis T2 (20 min).
- Tests : `tests/calculerItineraire.test.js` (9 tests) et `tests/modulesCarte.test.js` (2 tests). `npm run verify` : lint propre, 66 tests sur 66, dépendances conformes, 8 tests navigateur sur 8.
- Observé en vérifiant : l'étiquette « Hôtel de Ville » touchait « Université » (déplacée sous la ligne) ; sur téléphone, les noms d'arrêts étaient illisibles (agrandis sous 600 px).
- `SPEC.md` complétée : critères 6 à 11 pour le troisième mot, le compteur, la version mobile, la version, le conseil et l'itinéraire, chacun avec ce qui le vérifie.

## Étape 12 · Le bilan

- Bilans écrits dans `bilan/` (un fichier par personne) : `atelier/bilan/Louis.md`.
- `git push` répond « Everything up-to-date » chez chacun :
- Checklist du livrable entièrement cochée :
