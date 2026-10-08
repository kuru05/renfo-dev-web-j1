// Cap Web — câblage : lire les formulaires, mettre à jour l'historique, demander l'affichage
// de la discussion (view.js) et du trajet (carte.js), appeler le serveur (version, conseil).
import { validateMessage, replyTo, estMessage, LIMITE } from './brain.js';
import { renderMessages } from './view.js';
import { RESEAU, listerArrets, calculerItineraire, decrireEtape, resumerItineraire } from './reseau.js';
import { dessinerCarte, dessinerLegende, surlignerItineraire, remplirListeArrets, afficherEtapes } from './carte.js';

const formulaire = document.querySelector('#chat-form');
const champ = document.querySelector('#message');
const liste = document.querySelector('#messages');
const statut = document.querySelector('#status');
const effacer = document.querySelector('#effacer');
const versionElt = document.querySelector('#version');
const limiteElt = document.querySelector('#limite');
const compteur = document.querySelector('#compteur');

const CLE = 'capweb.historique';
const historique = [];

function sauvegarder() {
  localStorage.setItem(CLE, JSON.stringify(historique));
}

function charger() {
  const brut = localStorage.getItem(CLE);
  if (brut === null) {
    return;
  }
  try {
    const donnees = JSON.parse(brut);
    if (Array.isArray(donnees)) {
      historique.push(...donnees.filter(estMessage));
    }
  } catch {
    statut.textContent = 'Conversation précédente illisible : nouvelle conversation.';
  }
}

function mettreAJourCompteur() {
  compteur.textContent = `${champ.value.length} / ${LIMITE}`;
  // À 90 % de la limite, le compteur prévient : la classe change, le CSS s'occupe de l'apparence.
  compteur.classList.toggle('alerte', champ.value.length >= LIMITE * 0.9);
}

champ.addEventListener('input', mettreAJourCompteur);

// Entrée envoie le message, Maj+Entrée va à la ligne, comme dans une messagerie.
// requestSubmit passe par l'écouteur submit : la validation reste la même.
champ.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' && !event.shiftKey) {
    event.preventDefault();
    formulaire.requestSubmit();
  }
});

// Demande un conseil au serveur ; en cas de panne, un message clair plutôt qu'un écran blanc.
async function demanderConseil() {
  try {
    const reponse = await fetch('/api/conseil', { headers: { accept: 'application/json' } });
    if (!reponse.ok) {
      throw new Error(`HTTP ${reponse.status}`);
    }
    const donnees = await reponse.json();
    if (typeof donnees.conseil !== 'string') {
      throw new Error('conseil absent');
    }
    return donnees.conseil;
  } catch {
    return 'Le serveur ne répond pas : conseil indisponible.';
  }
}

formulaire.addEventListener('submit', async (event) => {
  event.preventDefault();
  const controle = validateMessage(champ.value);
  if (!controle.ok) {
    statut.textContent = controle.error;
    champ.focus();
    return;
  }
  let reponse;
  if (controle.value.toLowerCase() === 'conseil') {
    statut.textContent = 'Recherche d’un conseil…';
    reponse = await demanderConseil();
  } else {
    reponse = replyTo(controle.value);
  }
  historique.push({ role: 'user', text: controle.value });
  historique.push({ role: 'assistant', text: reponse });
  sauvegarder();
  renderMessages(historique, liste);
  champ.value = '';
  mettreAJourCompteur();
  statut.textContent = '';
  champ.focus();
});

effacer.addEventListener('click', () => {
  if (!confirm('Effacer toute la conversation ?')) {
    return;
  }
  historique.length = 0;
  localStorage.removeItem(CLE);
  renderMessages(historique, liste);
  statut.textContent = 'Conversation effacée.';
});

// La limite vient de brain.js : un seul endroit à modifier.
champ.maxLength = LIMITE;
limiteElt.textContent = String(LIMITE);
mettreAJourCompteur();

charger();
renderMessages(historique, liste);

// Itinéraire : choisir un départ et une arrivée, dans les listes ou sur la carte.
const formulaireTrajet = document.querySelector('#trajet-form');
const choixDepart = document.querySelector('#depart');
const choixArrivee = document.querySelector('#arrivee');
const resumeTrajet = document.querySelector('#trajet-resume');
const listeEtapes = document.querySelector('#etapes');
const carte = document.querySelector('#carte');

function afficherTrajet() {
  const depart = choixDepart.value;
  const arrivee = choixArrivee.value;
  if (depart === '' || arrivee === '') {
    resumeTrajet.textContent = 'Choisissez un départ et une arrivée.';
    afficherEtapes(listeEtapes, []);
    surlignerItineraire(carte, null, depart, arrivee);
    return;
  }
  const itineraire = calculerItineraire(depart, arrivee);
  resumeTrajet.textContent = resumerItineraire(itineraire, depart, arrivee);
  afficherEtapes(listeEtapes, (itineraire?.etapes ?? []).map((etape) => decrireEtape(etape)));
  surlignerItineraire(carte, itineraire, depart, arrivee);
}

// Un clic sur la carte choisit d'abord le départ, puis l'arrivée.
function choisirArret(id) {
  if (choixDepart.value === '' || choixArrivee.value !== '') {
    choixDepart.value = id;
    choixArrivee.value = '';
    resumeTrajet.textContent = 'Départ choisi. Cliquez maintenant sur l’arrêt d’arrivée.';
    afficherEtapes(listeEtapes, []);
    surlignerItineraire(carte, null, id, '');
    return;
  }
  choixArrivee.value = id;
  afficherTrajet();
}

formulaireTrajet.addEventListener('submit', (event) => {
  event.preventDefault();
  afficherTrajet();
});

remplirListeArrets(choixDepart, listerArrets());
remplirListeArrets(choixArrivee, listerArrets());
dessinerCarte(carte, RESEAU, choisirArret);
dessinerLegende(document.querySelector('#legende'), RESEAU);

// Plan B : si le serveur ne répond pas, le pied de page le dit au lieu de rester sur « version… ».
async function afficherVersion() {
  try {
    const reponse = await fetch('/version.json', { headers: { accept: 'application/json' } });
    if (!reponse.ok) {
      throw new Error(`HTTP ${reponse.status}`);
    }
    const donnees = await reponse.json();
    if (typeof donnees.version !== 'string') {
      throw new Error('version absente');
    }
    versionElt.textContent = `version ${donnees.version}`;
  } catch {
    versionElt.textContent = 'version indisponible';
  }
}

afficherVersion();
