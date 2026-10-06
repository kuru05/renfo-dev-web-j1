# Carnet de bord · J2

Binôme : b03 · Membres : Hugo M., Merlin, Louis (trinôme) · Nos réglages sont dans `atelier/cahier-personnel.json` : ne les recopiez pas ici.

## Mon positionnement (chacun de vous deux)

Pour chaque notion, chacun écrit « à l'aise » ou « à renforcer ». Ce n'est ni évalué ni classé : c'est votre point de départ pour le bilan individuel de fin de module.

| Notion | Hugo : | Merlin : | Louis : |
|---|---|---|---|
| Structure HTML | | | |
| CSS et responsive | | | |
| JavaScript | | | |
| DOM et événements | | | |
| Git | | | |
| Tests | | | |

Chacun, en une phrase, son objectif personnel pour J2 et J3.

Hugo :

Merlin :

Louis :

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
| Identifiant du commit `test:` | bed6ea2 |
| Identifiant du commit `feat:` | 08ee7f4 |
| Casse volontaire : la ligne changée | `return lettres.length >= 2 && !/p{Ll}/u.test(message);` remplacée par `return false;` |
| Casse volontaire : le test devenu rouge | « C1 : un message tout en majuscules donne true, accents et ponctuation compris » et « C4 : il faut deux lettres au moins » |
| Pour aller plus loin : la deuxième fonction | F2 `compterMots` (test: 2dc2699, feat: 156e004) |

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
