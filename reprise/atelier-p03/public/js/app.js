const formulaire = document.querySelector('#chat-form');
const statut = document.querySelector('#status');
const versionElt = document.querySelector('#version');

// Interface seule : on bloque l’envoi (la page ne se recharge pas) et on le dit dans le statut ; les réponses arrivent en J1-09.
formulaire?.addEventListener('submit', (event) => {
  event.preventDefault();
  if (statut) {
    statut.textContent = 'Interface prête.';
  }
});

// Version du serveur local, échec discret si indisponible.
fetch('/version.json', { headers: { accept: 'application/json' } })
  .then((reponse) => (reponse.ok ? reponse.json() : null))
  .then((donnees) => {
    if (donnees && typeof donnees.version === 'string' && versionElt) {
      versionElt.textContent = `version ${donnees.version}`;
    }
  })
  .catch(() => {});
