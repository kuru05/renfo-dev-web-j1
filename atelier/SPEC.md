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
