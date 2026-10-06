# Carnet de bord J1 · Appareillage


Un carnet par binôme, rempli au fil de l'eau avec vos propres mots. Une phrase honnête (« j'ai essayé X, j'ai vu Y, je ne comprends pas pourquoi ») vaut mieux qu'une phrase parfaite recopiée. Aucune donnée personnelle, aucune clé ni jeton, ni l'adresse complète que `dsh web` affiche (elle contient un jeton). C'est aussi votre journal de décisions (astuce 13) : ce que vous avez demandé, ce qui a cassé, ce que vous avez refusé, et pourquoi.

Binôme : Hugo M., Merlin et Louis (identifiant b03)

Thème provisoire et public visé : Réseau de bus et de tram. Voyageurs : recommandations de trajet d'un point A à un point B, lignes, horaires et tarifs.

Trois questions auxquelles l'assistant pourrait répondre :
1. Comment aller de la gare à l'université ?
2. Combien coûte un ticket ?
3. À quelle heure passe le dernier tram ?

Rôles de départ et moments d'échange :

## Cahier personnel (remis par le formateur en J1-01)

Recopiez les valeurs telles que le formateur vous les a remises. Ne les changez pas, ne les échangez pas avec un autre binôme.

- Limite de caractères d'un message (le nombre N) :
- Premier mot reconnu, en plus de « salut », « aide » et « test » :
- Second mot reconnu :

Cahier pas encore reçu au moment d'écrire le code. En attendant, Cap Web utilise des **valeurs provisoires** : limite 280 (celle de la copie de reprise), mots « horaires » et « tarifs ». À remplacer par les vraies valeurs dès que le formateur les donne (`LIMITE` et les deux mots dans `brain.js`, `maxlength` et le libellé dans `index.html`).

## Commandes essayées

Notez le dossier de lancement, la commande et sa sortie exacte, surtout quand un outil a bloqué.

- Dossier : `cap-web-j1/atelier`
- Commande et résultat : `npm start` → la page de départ s'affiche à `http://127.0.0.1:3000` (onglet « Cap Web — départ »). `npm test` → à relancer sur notre poste : chez Claude, 9 tests du serveur passent sur 9.

Pour chaque checkpoint : cochez la case quand toute la preuve de la fiche est réunie, collez la preuve (texte, commande ou phrase), puis notez ce que vous avez prédit, essayé, observé, et une difficulté qui reste.

## Le chat web (N0 Subir)

### J1-01 · 🧭 Équipage — [fiche](checkpoints/J1-01-equipage.md)

- [ ] Validé
- Preuve (page de départ affichée sur votre poste, cahier personnel recopié ci-dessus) :
- Le `p#status` est-il vide dans le HTML ? Qui écrit sa phrase ?
- Décision prise ensemble :
- Difficulté qui reste :

### J1-02 · 💬 Premier prompt — [fiche](checkpoints/J1-02-premier-prompt.md)

- [ ] Validé
- Preuve : `essais-n0/chatbot-v1.html` s'ouvre ; le prompt et la première réponse sont collés ci-dessous, en entier, sans donnée personnelle.
- Mon prompt, tel quel :

  > Fais-moi un chatbot sur un réseau de bus et de tram (trajet d'un point A à un point B, lignes, horaires, tarifs), dans une seule page HTML que j'ouvre dans mon navigateur.

- La première réponse du chat (texte et code), telle quelle (chat utilisé : Claude) :

  > Voici un chatbot pour un réseau de bus et de tram, dans une seule page HTML. Enregistrez le code dans un fichier `chatbot-v1.html`, puis ouvrez-le dans votre navigateur : rien à installer. Comme je ne connais pas votre réseau, j'ai inventé un réseau d'exemple (Tram A, Tram B, Bus 1, Bus 2, quinze arrêts) avec des horaires et des tarifs fictifs. Si la question cite deux arrêts, le chatbot cherche un trajet direct ou avec une seule correspondance ; sinon il repère des mots-clés (horaires, tarifs, lignes, correspondance) ; sinon il dit qu'il n'a pas compris.

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Assistant Bus et Tram</title>
  <style>
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 16px;
      font-family: Verdana, Geneva, sans-serif;
      background: #f1f5f4;
      color: #1c2b2a;
    }
    .cadre {
      max-width: 640px;
      margin: 0 auto;
      background: #ffffff;
      border: 1px solid #c9d6d3;
      border-radius: 10px;
    }
    header {
      background: #0f766e;
      color: #ffffff;
      padding: 14px 16px;
      border-radius: 10px 10px 0 0;
    }
    header h1 { margin: 0; font-size: 1.25rem; }
    header p { margin: 6px 0 0; font-size: 0.85rem; }
    #conversation {
      height: 420px;
      overflow-y: auto;
      padding: 14px;
    }
    .bulle {
      width: fit-content;
      max-width: 85%;
      margin: 0 0 10px;
      padding: 9px 12px;
      border-radius: 10px;
      line-height: 1.45;
      white-space: pre-line;
      overflow-wrap: anywhere;
    }
    .assistant { background: #e2efec; }
    .voyageur { background: #0f766e; color: #ffffff; margin-left: auto; }
    form {
      display: flex;
      gap: 8px;
      padding: 12px;
      border-top: 1px solid #c9d6d3;
    }
    #question {
      flex: 1;
      min-width: 0;
      padding: 10px;
      font-size: 1rem;
      border: 1px solid #8fa6a2;
      border-radius: 6px;
    }
    button {
      padding: 10px 14px;
      font-size: 1rem;
      color: #ffffff;
      background: #0f766e;
      border: none;
      border-radius: 6px;
      cursor: pointer;
    }
    button:hover { background: #0b5a54; }
  </style>
</head>
<body>
  <div class="cadre">
    <header>
      <h1>Assistant Bus et Tram</h1>
      <p>Trajets, lignes, horaires et tarifs d'un réseau fictif d'exemple.</p>
    </header>
    <div id="conversation"></div>
    <form id="formulaire">
      <input type="text" id="question" aria-label="Votre question" placeholder="Ex. : de la gare au stade" autocomplete="off">
      <button type="submit">Envoyer</button>
    </form>
  </div>

  <script>
    // ----- Les données du réseau (inventées pour l'exemple) -----
    const lignes = [
      { nom: 'Tram A', arrets: ['Gare Centrale', 'Hôtel de Ville', 'Université', 'Stade', 'Parc des Expositions'] },
      { nom: 'Tram B', arrets: ['Aéroport', 'Gare Centrale', 'Marché', 'Hôpital', 'Lac'] },
      { nom: 'Bus 1', arrets: ['Hôtel de Ville', 'Marché', 'Musée', 'Piscine', 'Zoo'] },
      { nom: 'Bus 2', arrets: ['Université', 'Bibliothèque', 'Hôpital', 'Lycée', 'Zone Commerciale'] }
    ];

    // Les mots qui permettent de reconnaître chaque arrêt dans une question.
    const motsDesArrets = {
      'Gare Centrale': ['gare'],
      'Hôtel de Ville': ['hotel de ville', 'mairie'],
      'Université': ['universite'],
      'Stade': ['stade'],
      'Parc des Expositions': ['parc des expositions', 'expositions'],
      'Aéroport': ['aeroport'],
      'Marché': ['marche'],
      'Hôpital': ['hopital'],
      'Lac': ['lac'],
      'Musée': ['musee'],
      'Piscine': ['piscine'],
      'Zoo': ['zoo'],
      'Bibliothèque': ['bibliotheque'],
      'Lycée': ['lycee'],
      'Zone Commerciale': ['zone commerciale', 'centre commercial']
    };

    const MINUTES_PAR_ARRET = 3;

    const reponses = [
      {
        mots: ['bonjour', 'salut', 'bonsoir', 'coucou'],
        texte: "Bonjour ! Dites-moi d'où vous partez et où vous allez, par exemple : « de la gare au stade »."
      },
      {
        mots: ['horaire', 'horaires', 'heure', 'heures', 'premier', 'dernier', 'frequence'],
        texte: "Horaires :\n- Trams : de 5 h 30 à 0 h 30, un tram toutes les 8 minutes en journée.\n- Bus : de 6 h à 22 h, un bus toutes les 15 minutes."
      },
      {
        mots: ['tarif', 'tarifs', 'prix', 'ticket', 'tickets', 'billet', 'coute', 'abonnement'],
        texte: "Tarifs :\n- Ticket à l'unité : 1,60 €, valable 1 heure avec correspondances.\n- Carnet de 10 tickets : 13 €.\n- Abonnement mensuel : 40 €."
      },
      {
        mots: ['ligne', 'lignes', 'plan', 'reseau', 'arret', 'arrets'],
        texte: null // construit à partir du tableau des lignes
      },
      {
        mots: ['correspondance', 'correspondances', 'changer', 'changement'],
        texte: "Correspondances possibles :\n- Gare Centrale : Tram A et Tram B\n- Hôtel de Ville : Tram A et Bus 1\n- Université : Tram A et Bus 2\n- Marché : Tram B et Bus 1\n- Hôpital : Tram B et Bus 2"
      },
      {
        mots: ['merci'],
        texte: "Avec plaisir, bon voyage !"
      },
      {
        mots: ['aide'],
        texte: "Je peux vous donner un trajet entre deux arrêts, la liste des lignes, les horaires, les tarifs et les correspondances."
      }
    ];

    const conversation = document.getElementById('conversation');
    const formulaire = document.getElementById('formulaire');
    const champ = document.getElementById('question');

    // Met le texte en minuscules et enlève les accents, pour comparer plus facilement.
    function simplifier(texte) {
      return texte.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    }

    // Vrai si le mot apparaît en entier dans le texte (pas au milieu d'un autre mot).
    function contientMot(texte, mot) {
      return new RegExp('\\b' + mot + '\\b').test(texte);
    }

    // Renvoie les arrêts cités dans la question, dans l'ordre où ils apparaissent.
    function trouverArrets(texte) {
      const trouves = [];
      for (const arret in motsDesArrets) {
        for (const mot of motsDesArrets[arret]) {
          const position = texte.search(new RegExp('\\b' + mot + '\\b'));
          if (position !== -1) {
            trouves.push({ arret: arret, position: position });
            break;
          }
        }
      }
      trouves.sort(function (a, b) { return a.position - b.position; });
      return trouves.map(function (element) { return element.arret; });
    }

    function terminus(ligne, indexDepart, indexArrivee) {
      if (indexArrivee > indexDepart) {
        return ligne.arrets[ligne.arrets.length - 1];
      }
      return ligne.arrets[0];
    }

    function chercherTrajet(depart, arrivee) {
      // 1. Une ligne directe ?
      for (const ligne of lignes) {
        const i = ligne.arrets.indexOf(depart);
        const j = ligne.arrets.indexOf(arrivee);
        if (i !== -1 && j !== -1) {
          const nombre = Math.abs(j - i);
          return 'De ' + depart + ' à ' + arrivee + ' :\n'
            + 'Prenez le ' + ligne.nom + ' direction ' + terminus(ligne, i, j) + '.\n'
            + 'Descendez à ' + arrivee + ' (' + nombre + ' arrêt(s), environ ' + (nombre * MINUTES_PAR_ARRET) + ' min).';
        }
      }

      // 2. Sinon, une seule correspondance ?
      let meilleur = null;
      for (const ligne1 of lignes) {
        const i = ligne1.arrets.indexOf(depart);
        if (i === -1) { continue; }
        for (const ligne2 of lignes) {
          const j = ligne2.arrets.indexOf(arrivee);
          if (j === -1) { continue; }
          for (const change of ligne1.arrets) {
            const c1 = ligne1.arrets.indexOf(change);
            const c2 = ligne2.arrets.indexOf(change);
            if (c2 === -1) { continue; }
            const nombre = Math.abs(c1 - i) + Math.abs(j - c2);
            if (meilleur === null || nombre < meilleur.nombre) {
              meilleur = { ligne1: ligne1, ligne2: ligne2, change: change, i: i, j: j, c1: c1, c2: c2, nombre: nombre };
            }
          }
        }
      }
      if (meilleur !== null) {
        const duree = meilleur.nombre * MINUTES_PAR_ARRET + 5;
        return 'De ' + depart + ' à ' + arrivee + ' :\n'
          + '1. Prenez le ' + meilleur.ligne1.nom + ' direction ' + terminus(meilleur.ligne1, meilleur.i, meilleur.c1) + '.\n'
          + '2. Descendez à ' + meilleur.change + ' et prenez le ' + meilleur.ligne2.nom + ' direction ' + terminus(meilleur.ligne2, meilleur.c2, meilleur.j) + '.\n'
          + '3. Descendez à ' + arrivee + ' (' + meilleur.nombre + ' arrêts, environ ' + duree + ' min avec la correspondance).';
      }

      return "Je n'ai pas trouvé de trajet direct ou avec une seule correspondance entre " + depart + ' et ' + arrivee + '.';
    }

    function listeDesLignes() {
      let texte = 'Les lignes du réseau :';
      for (const ligne of lignes) {
        texte += '\n- ' + ligne.nom + ' : ' + ligne.arrets.join(' – ');
      }
      return texte;
    }

    function repondre(question) {
      const texte = simplifier(question);
      const arrets = trouverArrets(texte);

      if (arrets.length >= 2) {
        return chercherTrajet(arrets[0], arrets[1]);
      }

      for (const reponse of reponses) {
        for (const mot of reponse.mots) {
          if (contientMot(texte, mot)) {
            return reponse.texte === null ? listeDesLignes() : reponse.texte;
          }
        }
      }

      if (arrets.length === 1) {
        const noms = lignes
          .filter(function (ligne) { return ligne.arrets.includes(arrets[0]); })
          .map(function (ligne) { return ligne.nom; });
        return "L'arrêt " + arrets[0] + ' est desservi par : ' + noms.join(', ') + ".\nDites-moi aussi votre arrêt d'arrivée pour avoir un trajet.";
      }

      return "Je n'ai pas compris. Essayez « de la gare au stade », « horaires », « tarifs » ou « lignes ».";
    }

    function ajouterBulle(texte, auteur) {
      const bulle = document.createElement('p');
      bulle.className = 'bulle ' + auteur;
      bulle.textContent = texte;
      conversation.appendChild(bulle);
      conversation.scrollTop = conversation.scrollHeight;
    }

    formulaire.addEventListener('submit', function (evenement) {
      evenement.preventDefault();
      const question = champ.value.trim();
      if (question === '') {
        return;
      }
      ajouterBulle(question, 'voyageur');
      ajouterBulle(repondre(question), 'assistant');
      champ.value = '';
      champ.focus();
    });

    ajouterBulle("Bonjour ! Je suis l'assistant du réseau Bus et Tram. D'où partez-vous et où allez-vous ?", 'assistant');
  </script>
</body>
</html>
```

- Trois lignes d'observation (ce que j'ai vu en utilisant la page) (proposé par Claude, à relire et à redire avec nos mots) :
  1. « Comment aller de la gare à l'université ? » donne un trajet précis : Tram A direct, 2 arrêts, environ 6 minutes.
  2. « comment ça marche ? » reçoit une réponse sur l'arrêt Marché : le chatbot a reconnu le mot « marche » et n'a pas compris la question.
  3. Une question hors sujet reçoit « Je n'ai pas compris » ; un message vide ne fait rien, sans explication ; la conversation disparaît quand on recharge la page.
- Difficulté qui reste :

### J1-03 · 💥 Ça marche… jusqu'à quand — [fiche](checkpoints/J1-03-jusqua-quand.md)

- [ ] Validé
- Liste de contrôle de la version 1 (cinq à huit comportements essayés) :
  1. À l'ouverture, le message d'accueil de l'assistant s'affiche.
  2. Un clic sur « Envoyer » ajoute ma question dans une bulle à droite, et la touche Entrée fait pareil.
  3. « Comment aller de la gare à l'université ? » donne un trajet direct (Tram A, 2 arrêts, environ 6 min).
  4. « du zoo à l'aéroport » donne un trajet avec une correspondance (Bus 1, puis Tram B à Marché).
  5. « Combien coûte un ticket ? » donne les tarifs ; « À quelle heure passe le dernier tram ? » donne les horaires.
  6. Une question hors thème reçoit « Je n'ai pas compris… ».
  7. Le champ est vidé après l'envoi ; un message vide ou fait d'espaces n'ajoute aucune bulle.
  8. `<b>gras</b>` s'affiche avec ses chevrons, pas en gras.
  - Ajoutée après la modification 1 : 9. « Effacer » enlève toutes les bulles et remet le message d'accueil.
  - Ajoutée après la modification 2 : 10. F5 garde la conversation ; 11. « Effacer » puis F5 : il ne reste que l'accueil.
- Journal des régressions, une entrée par modification : ce que j'ai demandé · ce qui marche maintenant · ce qui marchait et ne marche plus · ce que je n'avais pas vu, et comment je l'ai trouvé.
  - Modification 1 (`chatbot-v2.html`) :
    - Ce que j'ai demandé : « Ajoute un bouton Effacer qui vide la conversation. »
    - Ce qui marche maintenant : un bouton rouge « Effacer » à droite de « Envoyer » ; un clic enlève toutes les bulles, remet le message d'accueil et replace le curseur dans le champ.
    - Ce qui marchait avant et ne marche plus : rien dans les 8 lignes de la liste, rejouées une par une.
    - Ce que je n'avais pas vu, et comment je l'ai trouvé : en réduisant la fenêtre à 360 px, le champ de saisie passe de 207 px à 121 px de large à cause du nouveau bouton ; tout reste visible mais on voit moins ce qu'on tape.
  - Modification 2 (`chatbot-v3.html`) :
    - Ce que j'ai demandé : « Garde les messages après rechargement de la page. »
    - Ce qui marche maintenant : après F5 toutes les bulles reviennent ; après « Effacer » puis F5 il ne reste que l'accueil ; une mémoire illisible (`{pas du json`) ne casse pas la page, la conversation repart de l'accueil.
    - Ce qui marchait avant et ne marche plus : rien dans les 9 lignes de la liste, rejouées une par une.
    - Ce que je n'avais pas vu, et comment je l'ai trouvé : en écrivant `[1,2]` à la main dans la mémoire du navigateur (F12, Application, Local Storage), la page affiche deux bulles vides au lieu de repartir de l'accueil.
  - Modification 3 (`chatbot-v4.html`) :
    - Ce que j'ai demandé : « Refuse un message vide en affichant un message d'erreur. »
    - Ce qui marche maintenant : un message vide ou d'espaces affiche en rouge « Votre message est vide : écrivez une question avant de valider. » sous le champ, et le curseur revient dans le champ ; le texte disparaît au prochain envoi accepté ou avec « Effacer ».
    - Ce qui marchait avant et ne marche plus : rien dans les 11 lignes de la liste, rejouées une par une.
    - Ce que je n'avais pas vu, et comment je l'ai trouvé : rien de nouveau avec cette modification ; j'ai cherché en rejouant la liste, puis message vide suivi de « Effacer », de F5 et d'un envoi normal.
- Chasse à l'angle mort (ce qui a été trouvé, et par qui) :
  - Essais automatiques demandés à Claude sur les quatre versions (à refaire à la main avec un voisin ou le formateur) :
  - « comment ça marche ? » : l'assistant répond sur l'arrêt Marché, parce qu'il reconnaît le mot « marche » (défaut présent dès la version 1).
  - « Quel est le prix pour aller de la gare au stade ? » : il donne le trajet mais pas le prix (dès la version 1).
  - « du zoo au lycée » : aucun trajet trouvé, parce qu'il faudrait deux correspondances (dès la version 1).
  - Message de 500 lettres, deux messages très rapides, `<b>gras</b>`, fenêtre de 360 px : rien de cassé, pas de défilement sur le côté.
  - Trouvé par un voisin ou le formateur :
- Deux phrases de conclusion (proposé par Claude, à relire et à redire avec nos mots) :
  - La modification la plus risquée est la mémoire (version 3) : c'est la seule qui a apporté un nouveau défaut (deux bulles vides quand la mémoire contient `[1,2]`), et elle touche à tout, puisqu'il faut enregistrer à chaque message, relire au chargement et vider aussi quand on clique sur « Effacer ».
  - Sans la liste de contrôle, on ne l'aurait pas su : la nouveauté marchait (F5 gardait bien la conversation), et le défaut n'apparaît qu'en rejouant toute la liste et en abîmant la mémoire exprès.
- Difficulté qui reste :

### J1-04 · 🎲 Même prompt, autre réponse — [fiche](checkpoints/J1-04-meme-prompt.md)

- [ ] Validé
- Le prompt de référence (identique aux trois essais) :

  > Fais-moi un chatbot sur un réseau de bus et de tram (trajet d'un point A à un point B, lignes, horaires, tarifs), dans une seule page HTML que j'ouvre dans mon navigateur.

  Identique aux trois essais, mot pour mot, et identique au prompt de J1-02. Les trois essais viennent de trois conversations neuves avec Claude, lancées séparément : aucune ne connaissait les autres ni nos essais précédents. À savoir : ces trois assistants pouvaient lancer et tester leur page avant de répondre, ce qu'un simple chat web ne fait pas.
- Le tableau des écarts (trois colonnes A, B, C ; au moins quatre critères ; des faits, pas des impressions). La colonne D est notre `chatbot-v1.html` de J1-02, pour comparer :

  | Critère | A (`essai-A.html`) | B (`essai-B.html`) | C (`essai-C.html`) | D (`chatbot-v1.html`) |
  |---|---|---|---|---|
  | Structure du code | 1 302 lignes, 1 balise `script` en bas de page, aucune adresse `https://` | 1 187 lignes, 2 balises `script` (le calcul, puis l'interface), charge une police sur `fonts.googleapis.com` | 1 364 lignes, 1 balise `script`, charge une police sur `fonts.googleapis.com` | 285 lignes, 1 balise `script`, aucune adresse `https://` |
  | Réseau inventé | « Héron » à Brévanne : 2 trams, 4 bus | « Clairval » : 2 trams, 4 bus | « Cadence » à Valorgue : 3 trams, 4 bus, 1 navette aéroport | sans nom : 2 trams, 2 bus |
  | « Comment aller de la gare à l'université ? » | Gare Centrale vers Campus Ouest : T1 puis T2, 1 correspondance, 20 min, 1,70 €, avec les heures | Gare Centrale vers Campus Sciences : T1 direct, 8 min, 1,70 €, avec les heures | Gare Centrale vers Université : T1 direct, 10 min, 1,70 €, avec les heures | Tram A direct, 2 arrêts, environ 6 min, sans heure ni prix |
  | « À quelle heure passe le dernier tram ? » | un tableau des derniers départs du T1 et du T2, par jour | posée seule : « Pour quel arrêt ou quelle ligne ? » ; posée après un trajet : il redonne le trajet au lieu de répondre | « Pour quelle ligne ? » avec 8 boutons | les heures de début et de fin des trams et des bus |
  | « Combien coûte un ticket ? » | 1,70 € | 1,70 € | 1,70 € | 1,60 € |
  | Message hors thème | « Je n'ai pas compris votre demande… » et 3 boutons de suggestion | « Je n'ai pas compris… » et 4 boutons de suggestion | « Je n'ai pas compris cette demande… » et 4 boutons de suggestion | « Je n'ai pas compris. Essayez… », sans bouton |
  | Ce qui manque : message vide | rien ne se passe, aucune erreur affichée | rien ne se passe, aucune erreur affichée | rien ne se passe, aucune erreur affichée | rien ne se passe, aucune erreur affichée |
  | Ce qui manque : mémoire (F5) | conversation perdue | conversation perdue | conversation perdue | conversation perdue |
  | Bouton pour vider la conversation | « Recommencer » | aucun | « Nouvelle conversation » | aucun |
  | Limite de longueur du message | 300 caractères (`maxlength`) | aucune | aucune | aucune |
  | Plan du réseau | oui, à droite de la conversation | oui, à gauche de la conversation | oui, à droite de la conversation | non |
  | `<b>gras</b>` | affiché avec ses chevrons | affiché avec ses chevrons | affiché avec ses chevrons | affiché avec ses chevrons |
  | Fenêtre de 360 px | pas de défilement sur le côté | pas de défilement sur le côté | pas de défilement sur le côté | pas de défilement sur le côté |

  Les cinq essais (thème, hors thème, message vide, F5, 360 px) ont été rejoués automatiquement par Claude sur les quatre pages ; à revérifier à la main.
- Une phrase de conclusion (ce que ces écarts autorisent, ce qu'ils interdisent de supposer) (proposé par Claude, à relire et à redire avec nos mots) : ces écarts autorisent à faire confiance à ce que les trois réponses ont en commun et que nous avons vérifié (la page s'ouvre, un message vide est ignoré, `<b>gras</b>` reste du texte), mais ils interdisent de supposer qu'une réponse est « la » bonne, puisque le réseau, le trajet et sa durée changent à chaque essai.
- Difficulté qui reste :

## L'agent (N1 Demander)

### J1-05 · 🛠 dsh en main — [fiche](checkpoints/J1-05-dsh-en-main.md)

- [ ] Validé
- Preuve (`dsh --version`, mode Read Only, modèle `capweb-ia`, `git status -- atelier` propre ; **jamais la clé**) :
  - Git : fait. Dépôt créé à la racine du paquet (`git init -b main`), commit `1095694` « J1 : point de départ avant dsh », puis `git status -- atelier` : rien à valider.
  - dsh : **pas encore fait**. Il manque la fiche de clés du formateur (adresse de la passerelle et clé « agent »). Tant que dsh n'est pas branché, il n'y a ni `dsh --version`, ni consigne, ni réponse de l'agent à coller ici.
- La consigne exacte envoyée à l'agent et sa réponse :
- Pour chaque fichier cité : existe ou non, description juste ou fausse, pourquoi ; et un fichier qu'il n'a pas cité :
- Difficulté qui reste : dsh n'est pas branché. Les étapes J1-06 à J1-09 ont donc été faites avec **Claude comme agent, à la place de dsh** : mêmes demandes, mêmes contraintes, un commit par étape. À dire au formateur.

### J1-06 · 🧱 Anatomie d'un prompt — [fiche](checkpoints/J1-06-anatomie-dun-prompt.md)

- [ ] Validé
- Preuve (deux prompts, deux résultats, grille remplie, commit du squelette) : commit `3f4f883` « J1 : squelette de Cap Web (prompt structuré) ». L'essai du prompt vague n'a pas été fait.
- Prompt vague et ce que montre la page (trois lignes, fichiers touchés) : **pas fait**. Prompt prévu : « Écris la page de Cap Web : un formulaire, une liste de messages et un statut. »
- Prompt structuré, en six parties, tel qu'envoyé (à Claude) :

  ```text
  RÔLE : Tu es développeur web. Tu écris du HTML, du CSS et du JavaScript sans bibliothèque, pour des débutants.
  TÂCHE : Écris le squelette de la page de « Cap Web », un assistant pour les voyageurs d'un réseau de bus et de tram (trajets, lignes, horaires, tarifs) : un formulaire, une liste de messages, une ligne de statut.
  CONTRAINTES :
  - Modifie uniquement public/index.html, public/styles.css et public/js/app.js. Le serveur ne sert que ces trois fichiers : n'en crée aucun autre.
  - Garde ces identifiants : form#chat-form, textarea#message, ul#messages, p#status.
  - Le champ #message est limité à 280 caractères (maxlength).
  - Le contenu de la page est dans un main. Un seul h1 (« Cap Web »), un label lié au champ, un bouton « Envoyer », p#status avec role="status", html lang="fr". Aucune bibliothèque, aucune adresse https://.
  FORMAT DE SORTIE : d'abord la liste de tes hypothèses (cinq au plus), puis tu t'arrêtes. Après mon « ok », tu écris les trois fichiers, puis tu réponds par la liste des fichiers écrits.
  EXEMPLES ET CONTRE-EXEMPLES : voulu : <button type="submit">Envoyer</button>. Refusé : <div onclick="envoyer()">Envoyer</div> (ce n'est pas un bouton) ; un fichier script.js à côté de app.js (le serveur répondrait 404).
  CRITÈRE D'ARRÊT : app.js empêche seulement le rechargement de la page à l'envoi et écrit alors « Interface prête. » dans le statut ; il n'ajoute aucun message à la liste. Quand les trois fichiers sont écrits, tu t'arrêtes.
  ```

- Les hypothèses de l'agent, et ma réponse :
  1. La limite est 280 en attendant le cahier personnel ; elle apparaît dans `maxlength` et dans le texte de l'étiquette.
  2. La liste des messages est vide au départ, et la page garde son `title`, son `viewport` et son `lang="fr"`.
  3. Je ne mets que ce qui est demandé : pas de `header`, de `footer`, de `section` ni de `h2`.
  4. Je ne mets pas `required` sur le champ, puisque le prompt ne le demande pas.
  5. Le statut est vide au chargement ; « Interface prête. » n'apparaît qu'après un envoi.
  - Ma réponse : Claude a continué sans attendre notre « ok ». Les hypothèses 3 et 4 ont été corrigées plus tard, en J1-08.
- La grille (✔ ou ✘ et un mot, pour « vague » puis « structuré ») :

  | Critère | Prompt vague | Prompt structuré |
  |---|---|---|
  | La page s'affiche sans erreur (F12, onglet Console) | pas fait | ✔ aucune erreur |
  | Formulaire, liste et statut sont là, avec les quatre identifiants | pas fait | ✔ les quatre sont présents, une fois chacun |
  | Seuls les trois fichiers autorisés ont changé (`git status -- atelier`) | pas fait | ✔ `index.html`, `styles.css`, `js/app.js` |
  | `npm test` reste vert | pas fait | ✔ 9 sur 9 |
  | Aucune bibliothèque, aucune adresse `https://` | pas fait | ✔ aucune |
  | Vous savez expliquer chaque partie de la page en une phrase | pas fait | à remplir par le groupe |
- Une phrase : entre les deux résultats, ce qui a le plus changé, c'est… parce que la partie… de mon prompt disait…
- Difficulté qui reste :

### J1-07 · 👣 Petits pas — [fiche](checkpoints/J1-07-petits-pas.md)

- [ ] Validé
- Preuve (découpage écrit avant la première demande, trois diffs relus, un refus écrit, un commit par étape acceptée, trois boutons de questions qui fonctionnent) : commits `e95e611`, `75db593` et `5c2756c`, un par étape ; les trois boutons copient leur question dans le champ. Le refus écrit reste à faire.
- La tâche, mes trois questions et mon découpage en trois étapes (écrit avant la première demande d'écriture) :
  - Tâche : afficher sous le formulaire nos trois questions en boutons ; un clic copie la question dans le champ, sans l'envoyer.
  - Questions : « Comment aller de la gare à l'université ? », « Combien coûte un ticket ? », « À quelle heure passe le dernier tram ? ».
  - Étape 1 : dans `index.html` seulement, une liste `ul#suggestions` de trois boutons `type="button"`.
  - Étape 2 : dans `app.js` seulement, un clic copie le texte du bouton dans le champ.
  - Étape 3 : après le clic, le curseur est dans le champ et le statut dit « Question copiée : modifiez-la ou envoyez-la. »
- Ce que l'agent a proposé comme découpage, ce que j'ai gardé, pourquoi : Claude a gardé ce découpage, celui de la fiche, sans rien changer : chaque étape touche un seul fichier et se teste en un clic.
- Mon refus écrit : ce que l'agent avait fait, pourquoi je le refuse, ce que j'ai demandé à la place : **à écrire par le groupe.** Aucun des trois diffs ne contient de changement non demandé. Comme le prévoit la fiche, voici les changements que Claude aurait pu ajouter en plus, sans les avoir faits ; il faut en refuser un par écrit :
  1. Envoyer la question dès le clic sur le bouton.
  2. Effacer le statut tout seul après trois secondes, avec `setTimeout`.
  3. Ajouter une infobulle (`title`) sur chaque bouton.
  - Refus (proposé par Claude, à relire et à redire avec nos mots) : nous refusons le changement 1, « envoyer la question dès le clic ». La tâche dit que le clic copie la question « sans l'envoyer » : on doit pouvoir la modifier avant, et le statut dit justement « modifiez-la ou envoyez-la ». À la place, nous gardons l'étape 2 telle quelle : le clic copie, et c'est le bouton « Envoyer » qui envoie.
- Difficulté qui reste :

**Journal des décisions.** Une ligne par demande faite à l'agent, de J1-07 à J1-09 (les trois étapes de J1-07, puis la correction de J1-08, puis les six demandes de J1-09) : la demande copiée, le diff relu (fichiers, nombre de lignes, une chose que je n'avais pas demandée ?), le verdict et pourquoi.

| N° | Demande | Diff relu | Verdict et pourquoi |
|---|---|---|---|
| 1 | J1-07, étape 1 : « dans public/index.html, sous le formulaire, ajoute une liste ul#suggestions de trois boutons type="button", un par question. Aucun JavaScript, aucun autre fichier. » | `e95e611` : 1 fichier (`index.html`), +5 lignes. Rien de non demandé. | Accepté : les trois boutons s'affichent et ne font rien ; un seul bouton s'appelle « Envoyer ». |
| 2 | J1-07, étape 2 : « dans public/js/app.js, un clic sur un bouton de ul#suggestions copie son texte dans textarea#message. Pas d'envoi, pas d'onclick, pas d'innerHTML. » | `75db593` : 1 fichier (`app.js`), +9 lignes. Rien de non demandé. | Accepté : le texte arrive dans le champ, le statut ne change pas, aucune ligne dans la liste. |
| 3 | J1-07, étape 3 : « après la copie, place le curseur dans textarea#message et écris dans p#status : Question copiée : modifiez-la ou envoyez-la. » | `5c2756c` : 1 fichier (`app.js`), +2 lignes. Rien de non demandé. | Accepté : le curseur est dans le champ, le statut affiche la phrase ; marche aussi avec Entrée et Espace. |
| 4 | J1-08 : correction du mot très long à 360 px (prompt dans la section J1-08). | `cbfdadb` : 1 fichier (`styles.css`), +1 ligne (`overflow-wrap: break-word`). Rien de non demandé. | Accepté : le dépassement passe de 208 px à 0 px. |
| 5 | J1-09, 1, l'envoi : « dans app.js seulement : pas de rechargement, la ligne Vous : <message> s'ajoute à ul#messages ; message vide ou d'espaces refusé avec un statut visible, focus au champ ; après un envoi accepté, champ et statut vidés. Contre-exemple : <b>gras</b> s'affiche avec ses chevrons. » | `5e4a903` : 1 fichier (`app.js`), +13 −2. Le statut « Interface prête. » disparaît, comme le dit la fiche. | Accepté : « salut », trois espaces, `<b>gras</b>` et un bouton de question suivi d'Envoyer se comportent comme demandé. |
| 6 | J1-09, 2, le cerveau : « crée brain.js avec validateMessage(raw) et replyTo(message) ; salut et bonjour, aide, test, repli ; contre-exemple : tester ne déclenche pas test ; ajoute js/brain.js à FICHIERS et TYPES. » | `56770dc` : 2 fichiers (`brain.js` nouveau, `server/app.js` +2 lignes et 2 virgules). Pas de `document`, `window` ni `localStorage` dans `brain.js`. | Accepté : `npm test` 9 sur 9 ; `replyTo(' SALUT ')` donne la réponse de « salut » ; « tester » reçoit le repli. |
| 7 | J1-09, 3, brancher : « dans app.js seulement : importe validateMessage et replyTo, refuse avec error, ajoute la ligne Cap Web : <réponse>. » | `3c6f862` : 1 fichier (`app.js`), +15 −7. Une petite fonction `ajouterLigne` en plus, pour ne pas écrire deux fois la création d'une ligne. | Accepté : chaque envoi donne « Vous : … » puis « Cap Web : … » ; trois espaces sont refusés avec le message de `brain.js`. |
| 8 | J1-09, 4, le cahier : « dans brain.js seulement : deux mots avec leur propre réponse, une limite mesurée après retrait des espaces, une seule constante. » Valeurs provisoires : 280, « horaires », « tarifs ». | `6467a2e` : 1 fichier (`brain.js`), +15 −1. Non demandé : la réponse de « aide » cite maintenant les deux nouveaux mots. | Accepté : 280 caractères passent, 281 sont refusés avec « Message trop long : 280 caractères maximum. » ; « HORAIRES » et « Tarifs » ont chacun leur réponse. |
| 9 | J1-09, 5, ranger : plan d'abord, puis « crée view.js qui exporte renderMessages(messages, container) ; app.js garde un tableau historique d'objets { role, text } et ne crée plus aucun li ; ajoute js/view.js à FICHIERS et TYPES. » | `7d04f9a` : 3 fichiers (`view.js` nouveau, `app.js`, `server/app.js`), +22 −10. `ajouterLigne` a disparu. | Accepté : même comportement qu'avant ; `/js/view.js` répond ; `app.js` ne contient plus `createElement`. |
| 10 | J1-09, 6, la mémoire : « dans app.js et index.html seulement : historique enregistré en JSON sous capweb.historique, relu au démarrage dans un try/catch ; contre-exemple : une valeur abîmée ne fait pas planter la page ; bouton #effacer avec confirm. » | `1c60270` : 2 fichiers (`app.js`, `index.html`), +46 −1. En plus : une fonction `estUnMessage` qui refuse aussi une mémoire au mauvais format, comme `[1,2]`. | Accepté : F5 garde la conversation ; `{pas du json` donne une liste vide et un statut ; Effacer puis Annuler garde tout, OK vide tout, même après F5. |

Les verdicts ci-dessus ont été posés par Claude après vérification dans un navigateur automatique. Le groupe doit relire chaque diff (`git show <numéro du commit>`) et refaire les essais à la main.

### J1-08 · 🔎 Revue de la page — [fiche](checkpoints/J1-08-revue-de-la-page.md)

- [ ] Validé
- Preuve (trois défauts, un corrigé avec son avant et son après, diff relu, revue adverse vérifiée) :
- Mes défauts, un par ligne :

  | Lentille (structure, clavier, écrans) | Où (élément ou fichier) | Comment je l'ai vu |
  |---|---|---|
  | Écrans | `styles.css`, règle `#messages li` (lignes 29 à 34) | À 360 px, avec une ligne de 60 lettres ajoutée dans la liste, la page dépasse de 208 px sur le côté (248 px à 320 px). |
  | Structure | `index.html`, lignes 10 à 25 | Il n'y a qu'un `main` : pas de `header`, de `section`, de `footer`, ni de `h2` après le `h1`. |
  | Structure | `index.html`, ligne 13, `<ul id="messages">` | La liste des messages n'a pas de nom : pas d'`aria-label`, pas de titre qui la nomme. |

  Ces trois défauts ont été relevés par Claude avec des mesures automatiques ; le groupe doit les revoir de ses yeux. Rien trouvé au clavier : Tab passe par le champ, « Envoyer », puis les trois boutons, et le focus se voit partout.

- La revue adverse : trois affirmations de l'agent, la référence qu'il a donnée (fichier, ligne), mon verdict (vrai, faux, rejeté sans référence) et comment j'ai vérifié :
  1. « Un mot très long dans un message fait défiler la page sur le côté sur un petit écran » : `styles.css`, lignes 29 à 34. Vrai : 208 px de dépassement mesurés à 360 px.
  2. « La page n'a ni en-tête ni pied de page, et aucun titre de niveau 2 » : `index.html`, lignes 10 à 25. Vrai : le compte des balises donne 0 `header`, 0 `footer`, 0 `section`, 0 `h2`.
  3. « La liste des messages n'est pas nommée pour un lecteur d'écran » : `index.html`, ligne 13. Vrai : l'attribut `aria-label` est absent.
  - Ici l'agent qui affirme et celui qui mesure sont le même (Claude) : le verdict du groupe reste à poser.
- Le défaut corrigé : l'avant (capture ou valeur), ma demande ciblée (copiée), le diff relu (fichiers, lignes, changement non demandé ?), l'après (même geste, même mesure) :
  - Avant : à 360 px, avec la ligne « Vous : » suivie de 60 lettres « a », `document.documentElement.scrollWidth - document.documentElement.clientWidth` vaut **208**.
  - Demande ciblée :

    ```text
    RÔLE : Tu es développeur web, tu corriges du CSS sans bibliothèque.
    TÂCHE : À 360 px de large, une ligne de la liste #messages qui contient un mot de 60 lettres fait dépasser la page de 208 px. Corrige ce seul problème.
    CONTRAINTES : ne modifie que public/styles.css. Pas d'overflow: hidden sur html ou body. Aucun autre changement.
    FORMAT DE SORTIE : le diff, puis une phrase sur la façon de vérifier.
    CONTRE-EXEMPLE : <li>Vous : aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa</li> sort de la page.
    CRITÈRE D'ARRÊT : quand ce seul défaut est corrigé, tu t'arrêtes.
    ```

  - Diff relu : 1 fichier (`styles.css`), 1 ligne ajoutée, `overflow-wrap: break-word;` dans `#messages li`. Aucun changement non demandé. Commit `cbfdadb`.
  - Après : même geste, même mesure, la valeur est **0** à 320, 360, 768 et 1280 px.
  - Bonus, trois autres corrections, une demande et un commit chacune : `35c3cac` (repères `header`, `section` avec son `h2` « Discussion », `footer`), `5581e1e` (`aria-label="Messages"` sur la liste et `required` sur le champ), `a624150` (liste des questions sans puces).
- Difficulté qui reste :

### J1-09 · 🧠 Un cerveau à règles, par prompts — [fiche](checkpoints/J1-09-cerveau-a-regles.md)

- [ ] Validé
- Preuve (comportements vérifiés : « Vous : … », message vide, `<b>gras</b>`, mes deux mots, ma limite ; `/js/brain.js` et `/js/view.js` affichés ; F5 ; « Effacer ») : six commits, de `5e4a903` à `1c60270`. Vérifié par Claude dans un navigateur automatique : tous les points de la preuve passent, avec les valeurs provisoires du cahier (280, « horaires », « tarifs »). À refaire à la main par le groupe.
- Le plan de la demande 5, en cinq lignes, avant d'écrire : (1) créer `view.js` avec `renderMessages` ; (2) dans `app.js`, remplacer les lignes créées une par une par un tableau `historique` ; (3) à chaque envoi, ajouter deux objets au tableau puis appeler `renderMessages` ; (4) retirer `ajouterLigne` et tout `createElement` de `app.js` ; (5) ajouter `js/view.js` aux deux listes du serveur et le redémarrer.
- Mes six demandes et leurs verdicts : dans le journal des décisions ci-dessus.
- Le rôle de chaque fichier, en une phrase chacun :
  - `app.js` : le chef d'orchestre ; il écoute le formulaire et les boutons, demande au cerveau de vérifier et de répondre, garde le tableau `historique`, l'enregistre en mémoire et demande l'affichage.
  - `brain.js` : le cerveau ; il vérifie un message (`validateMessage`) et choisit la réponse (`replyTo`), sans rien connaître de la page.
  - `view.js` : l'affichage ; `renderMessages` transforme le tableau des messages en lignes `li`, en `textContent`.
- Ce que j'ai vu quand j'ai mis `{pas du json` dans la mémoire : la page s'affiche normalement, la liste est vide, le statut dit « Mémoire illisible : la conversation repart vide. » et la console ne montre aucune erreur (vu par Claude en test automatique, à refaire à la main).
- Difficulté qui reste :

### J1-10 · 🧪 Épreuve de l'explication — [fiche](checkpoints/J1-10-epreuve-explication.md)

- [ ] Validé
- Preuve (`npm test` vert avec cinq tests dont ma limite, commit de sauvegarde, remise faite) :
  - `npm test` : 14 tests passent sur 14 (les 9 du serveur et 5 nouveaux dans `atelier/tests/brain.test.js`, dont celui de la limite).
  - Commit de sauvegarde : `1a13c04` « J1 : Cap Web répond ». Copie pour la suite : `atelier-j1.zip`, à la racine du paquet, sans `node_modules`.
  - Remise : **pas faite**, le canal reste à annoncer par le formateur.
  - À savoir : la fiche demande que les tests soient écrits par nous, pas par l'agent. Ici c'est Claude qui les a écrits, à notre demande. À dire au formateur, ou à réécrire nous-mêmes.
- Le test rouge : son nom, son message exact, et ce qu'il m'a appris :
  - Ce qui a été cassé exprès : dans `brain.js`, `const LIMITE = 280;` changé en `290`.
  - Nom du test rouge : « accepte N caractères et refuse N + 1 » (suite `validateMessage`). Résultat : 13 tests passent, 1 échoue.
  - Message exact : `Expected values to be strictly equal:` puis `true !== false` (`AssertionError`, ligne 20 de `brain.test.js`).
  - Ce que ça veut dire : avec une limite à 290, un message de 281 caractères est accepté (`true`) alors que le test attend un refus (`false`). Le test surveille donc bien la limite.
  - Réparé avec `git restore atelier/public/js/brain.js` : de nouveau 14 sur 14.
  - Ce que ça m'a appris : à écrire par le groupe.
- Épreuve de l'explication, éditeur fermé :
  - Ce que je n'ai pas su expliquer :
  - Ce que mon binôme n'a pas su expliquer :
- Difficulté qui reste :

## Quatre questions pour finir

1. Pourquoi `textContent` et pas `innerHTML` ?
   Pistes proposées par Claude, à redire avec nos mots : `textContent` affiche le texte tel quel, alors que `innerHTML` le lit comme du HTML. Avec `innerHTML`, le message `<b>gras</b>` s'afficherait en gras, et un message pourrait glisser une balise qui exécute du code dans la page.
2. Pourquoi trois fichiers plutôt qu'un seul ?
   Pistes proposées par Claude, à redire avec nos mots : chaque fichier a un seul rôle. `brain.js` ne touche pas à la page, donc `npm test` peut le vérifier sans navigateur ; `view.js` ne fait qu'afficher ; `app.js` relie les deux. Un changement de règle ne risque pas de casser l'affichage.
3. L'agent a écrit le code : comment savez-vous qu'il est juste, et qu'est-ce qui l'a vu échouer ?
   Pistes proposées par Claude, à redire avec nos mots : par les diffs relus un par un (16 commits), par les essais dans la page, et par `npm test`. Ce qui l'a vu échouer : le test de la limite, passé au rouge quand `LIMITE` a été changée en 290.
4. Quelle astuce avez-vous le plus utilisée aujourd'hui, et laquelle avez-vous oubliée ?

## Aides utilisées

- Indices, aide-mémoire, voisins :
- Ce que j'ai demandé à une IA, et comment j'ai vérifié sa réponse : Claude a joué le chat web de J1-02 à J1-04, puis l'agent à la place de dsh de J1-06 à J1-09 (code de `atelier`, un commit par étape), et il a écrit les cinq tests de J1-10. Il a aussi rempli les faits de ce carnet. Vérification : par Claude, avec des essais automatiques dans un navigateur, `npm test` et le lint ; par le groupe, relecture des diffs et essais à la main : à faire.

## Notes personnelles (chacun)

Pour préparer l'explication de votre part du code. Chacun écrit avec ses mots.

- Nom :
- Ce que j'ai compris :
- Ce que je n'ai pas encore compris :

- Nom :
- Ce que j'ai compris :
- Ce que je n'ai pas encore compris :

Git sert à sauvegarder chaque étape acceptée : lisez les différences et nommez les fichiers à enregistrer, jamais `git add -A`. Attendez la consigne du formateur avant tout envoi vers un dépôt commun.

[README du jour](README.md) · [Aide-mémoire HTML/CSS](ressources/aide-memoire.md) · [Aide-mémoire JavaScript](ressources/aide-memoire-js.md) · [Notice dsh](ressources/dsh.md)
