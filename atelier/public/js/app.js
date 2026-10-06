import { validateMessage, replyTo } from './brain.js';
import { renderMessages } from './view.js';

const formulaire = document.querySelector('#chat-form');
const statut = document.querySelector('#status');
const champ = document.querySelector('#message');
const liste = document.querySelector('#messages');
const boutonsDeQuestions = document.querySelectorAll('#suggestions button');
const boutonEffacer = document.querySelector('#effacer');

// Nom sous lequel la conversation est gardée dans la mémoire du navigateur.
const CLE_MEMOIRE = 'capweb.historique';

// Vrai si la valeur ressemble à un message : { role, text } avec un rôle connu.
function estUnMessage(valeur) {
  return valeur !== null
    && typeof valeur === 'object'
    && (valeur.role === 'user' || valeur.role === 'assistant')
    && typeof valeur.text === 'string';
}

// Relit la conversation gardée en mémoire. Une valeur abîmée ne casse rien :
// la conversation repart vide et le statut l'explique.
function lireMemoire() {
  const brut = localStorage.getItem(CLE_MEMOIRE);
  if (brut === null) {
    return [];
  }
  try {
    const relu = JSON.parse(brut);
    if (Array.isArray(relu) && relu.every(estUnMessage)) {
      return relu;
    }
  } catch {
    // Le texte gardé n'est pas du JSON : on passe à la suite.
  }
  statut.textContent = 'Mémoire illisible : la conversation repart vide.';
  return [];
}

// La conversation : un tableau d'objets { role, text }, où role vaut 'user' ou 'assistant'.
let historique = lireMemoire();
renderMessages(historique, liste);

// À l'envoi : la page ne se recharge pas, le cerveau vérifie le message puis répond.
formulaire.addEventListener('submit', (event) => {
  event.preventDefault();
  const resultat = validateMessage(champ.value);
  if (!resultat.ok) {
    statut.textContent = resultat.error;
    champ.focus();
    return;
  }
  historique.push({ role: 'user', text: resultat.value });
  historique.push({ role: 'assistant', text: replyTo(resultat.value) });
  localStorage.setItem(CLE_MEMOIRE, JSON.stringify(historique));
  renderMessages(historique, liste);
  champ.value = '';
  statut.textContent = '';
});

// « Effacer la conversation » : après confirmation, vide le tableau, la mémoire et l'affichage.
boutonEffacer.addEventListener('click', () => {
  if (!confirm('Effacer toute la conversation ?')) {
    return;
  }
  historique = [];
  localStorage.removeItem(CLE_MEMOIRE);
  renderMessages(historique, liste);
  statut.textContent = 'Conversation effacée.';
});

// Un clic sur un bouton de question copie son texte dans le champ, sans envoyer le formulaire.
for (const bouton of boutonsDeQuestions) {
  bouton.addEventListener('click', () => {
    champ.value = bouton.textContent;
    champ.focus();
    statut.textContent = 'Question copiée : modifiez-la ou envoyez-la.';
  });
}
