// Cap Web — affichage de l'historique. Aucune règle de réponse ici.

export function renderMessages(messages, container) {
  const lignes = messages.map((msg) => {
    const li = document.createElement('li');
    const nom = document.createElement('strong');
    nom.textContent = msg.role === 'user' ? 'Vous' : 'Cap Web';
    li.append(nom, ` : ${msg.text}`);
    if (msg.role === 'assistant') {
      li.classList.add('bot');
    }
    return li;
  });
  container.replaceChildren(...lignes);
}
