// L'affichage de Cap Web : il transforme le tableau des messages en lignes de la liste.
// Il ne contient aucune règle de réponse.

export function renderMessages(messages, container) {
  const lignes = messages.map((message) => {
    const ligne = document.createElement('li');
    const auteur = message.role === 'user' ? 'Vous' : 'Cap Web';
    ligne.textContent = `${auteur} : ${message.text}`;
    return ligne;
  });
  container.replaceChildren(...lignes);
}
