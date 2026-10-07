# Spécification de Cap Web

Chaque critère nomme ce qui le vérifie : un test de `npm test` ou un essai de 30 secondes dans la page (`npm start`, puis http://127.0.0.1:3000).

1. Quand on envoie 281 caractères, Cap Web refuse le message et l'erreur cite 280 ; 280 caractères sont acceptés.
   Vérifié par : test « accepte 280 caractères et refuse 281 » (`tests/contrat/brain.contrat.test.js`).

2. Quand on envoie un message vide ou fait seulement d'espaces, Cap Web le refuse, n'ajoute rien à la conversation et affiche une erreur dans le statut.
   Vérifié par : test « refuse le vide et les espaces seuls » ; essai : taper trois espaces puis Envoyer, la liste ne change pas.

3. Quand on envoie « salut », « SALUT » ou «   salut   », Cap Web donne la même réponse, et « bonjour » reçoit aussi cette réponse.
   Vérifié par : tests « ignore la casse et les espaces autour » et « donne la même réponse à « bonjour » et à « salut » ».

4. Quand on envoie un des deux mots du cahier personnel (ou une phrase inconnue), Cap Web répond par la réponse propre à ce mot (ou par un repli distinct de « salut », « aide » et « test »).
   Vérifié par : tests « reconnaît les deux mots du cahier personnel, quelles que soient la casse et les espaces autour » et « répond à une phrase inconnue par un repli distinct ».

5. Quand on envoie `<b>gras</b>`, Cap Web l'affiche tel quel, chevrons compris, sans mettre le texte en gras.
   Vérifié par : test « view.js affiche du texte et ne décide pas des réponses » ; essai : envoyer `<b>gras</b>` dans la page.

## Ajouts du jour 3

6. Quand on envoie « fontaine », Cap Web répond par la réponse propre à ce troisième arrêt ; « aide » annonce le nombre d'arrêts connus, calculé et non écrit à la main (3).
   Vérifié par : essai : envoyer « aide », puis « fontaine ».

7. Pendant la frappe, le compteur sous le champ affiche « longueur / 280 » ; il revient à « 0 / 280 » après l'envoi.
   Vérifié par : essai : taper « bonjour » (« 7 / 280 »), puis Envoyer (« 0 / 280 »).

8. Sous 600 px de large, le bouton Envoyer prend toute la largeur et rien ne dépasse de l'écran ; sur grand écran, il garde sa taille.
   Vérifié par : essai : F12, mode appareil (Ctrl+Maj+M), largeur 375.

9. Le pied de page affiche la version lue dans `/version.json` ; si cette lecture échoue, il affiche « version indisponible ».
   Vérifié par : test « GET /version.json renvoie la version fournie » (`tests/server.test.js`) ; essai : remplacer un instant `'/version.json'` par `'/version2.json'` dans `public/js/app.js`.

10. `GET /api/conseil` répond 200, en JSON, avec un conseil tiré au hasard parmi trois. Quand on envoie « conseil », Cap Web affiche ce conseil ; si le serveur est arrêté, il affiche « Le serveur ne répond pas : conseil indisponible. », sans écran blanc.
    Vérifié par : test « GET /api/conseil renvoie un conseil en JSON » (`tests/conseil.test.js`) ; essai : envoyer « conseil », puis arrêter le serveur (Ctrl+C) et renvoyer « conseil ».

11. Quand on choisit un départ et une arrivée (dans les listes ou en cliquant sur le plan), Cap Web affiche le trajet le plus rapide en minutes, correspondances comprises, étape par étape, et le met en évidence sur le plan ; tous les arrêts du réseau sont reliés entre eux.
    Vérifié par : tests « Gare → Université : tram T1 direct, direction Campus », « Ruisseau → Fontaine : le trajet le plus rapide passe par le bus 30 puis le tram T2 » et « tous les arrêts sont reliés entre eux » (`tests/calculerItineraire.test.js`) ; essai : Ruisseau → Fontaine, environ 18 minutes, 1 correspondance.
