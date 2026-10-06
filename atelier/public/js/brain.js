// Le cerveau de Cap Web : il vérifie un message et choisit une réponse.
// Il ne connaît rien de la page : il reçoit du texte et renvoie du texte.

// Limite du cahier personnel : nombre maximum de caractères d'un message.
const LIMITE = 280;

const REPONSE_SALUT = 'Bonjour ! Je suis Cap Web, l’assistant du réseau de bus et de tram. Écrivez « aide » pour voir ce que je sais faire.';
const REPONSE_AIDE = 'Posez une question sur les horaires, les tarifs ou un trajet (par exemple « Combien coûte un ticket ? »). Je connais aussi « salut », « aide » et « test ».';
const REPONSE_TEST = 'Test réussi : Cap Web vous reçoit bien.';
const REPONSE_HORAIRES = 'Horaires : les trams circulent de 5 h 30 à 0 h 30, les bus de 6 h à 22 h (réseau fictif).';
const REPONSE_TARIFS = 'Tarifs : un ticket coûte 1,60 € et reste valable une heure, correspondances comprises (réseau fictif).';
const REPONSE_TRAJET = 'Trajet : de la gare à l’université, prenez le tram A direction Campus, environ 15 minutes (réseau fictif).';
const REPONSE_REPLI = 'Je n’ai pas compris. Écrivez « aide » pour voir les sujets que je connais.';

// Vérifie le message brut. Renvoie { ok: false, error } ou { ok: true, value }.
export function validateMessage(raw) {
  if (typeof raw !== 'string') {
    return { ok: false, error: 'Le message doit être un texte.' };
  }
  const value = raw.trim();
  if (value === '') {
    return { ok: false, error: 'Message vide : écrivez une question.' };
  }
  if (value.length > LIMITE) {
    return { ok: false, error: `Message trop long : ${LIMITE} caractères maximum.` };
  }
  return { ok: true, value };
}

// Découpe le message en mots entiers, en minuscules et sans accents :
// « Combien coûte un ticket ? » donne ['combien', 'coute', 'un', 'ticket'].
function mots(message) {
  return String(message)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .split(/[^a-z0-9]+/)
    .filter((mot) => mot !== '');
}

// Les règles, dans l'ordre de priorité : la première dont un mot-clé apparaît
// dans le message donne la réponse. Seuls les mots entiers comptent :
// « tester » ne déclenche pas la règle de « test ».
const REGLES = [
  { motsCles: ['tarif', 'tarifs', 'prix', 'ticket', 'tickets', 'billet', 'billets', 'coute', 'coutent', 'abonnement'], reponse: REPONSE_TARIFS },
  { motsCles: ['horaire', 'horaires', 'heure', 'heures', 'dernier', 'derniere', 'premier', 'premiere', 'quand'], reponse: REPONSE_HORAIRES },
  { motsCles: ['trajet', 'itineraire', 'aller', 'rejoindre', 'gare', 'universite'], reponse: REPONSE_TRAJET },
  { motsCles: ['aide', 'aider', 'help'], reponse: REPONSE_AIDE },
  { motsCles: ['test'], reponse: REPONSE_TEST },
  { motsCles: ['salut', 'bonjour', 'bonsoir', 'hello'], reponse: REPONSE_SALUT }
];

// Choisit la réponse à partir des mots-clés du message,
// sans tenir compte des majuscules, des accents ni de la ponctuation.
export function replyTo(message) {
  const liste = mots(message);
  for (const regle of REGLES) {
    if (regle.motsCles.some((motCle) => liste.includes(motCle))) {
      return regle.reponse;
    }
  }
  return REPONSE_REPLI;
}
