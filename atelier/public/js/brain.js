// Cap Web — cerveau à règles. Fonctions pures : aucun accès à la page.

// Vos réglages : recopiez ici la limite et les deux mots de votre cahier-personnel.json.
export const LIMITE = 280;

const MOTS = {
  ruisseau: 'Arrêt Ruisseau : bus 12 vers Marché, bus 30 vers l’Université.',
  marché: 'Arrêt Marché : tram T1 entre Gare et Campus, correspondance avec le bus 12.',
  fontaine: 'Station Fontaine : terminus du tram T2, parking relais à côté.'
};

const motsConnus = Object.keys(MOTS).map((mot) => `« ${mot} »`).join(' et ');

const REPONSES = {
  salut: 'Bonjour ! Je suis Cap Web, votre assistant bus et tram. Écrivez « aide » pour voir les arrêts que je connais.',
  aide: `Je connais « salut », « aide », « test », et ${Object.keys(MOTS).length} arrêts du réseau : ${motsConnus}. Écrivez « conseil » pour un conseil de voyage, ou utilisez l’itinéraire au-dessus pour aller d’un arrêt à un autre.`,
  test: 'Test bien reçu : le réseau répond.',
  repli: 'Je ne connais pas encore cet arrêt. Écrivez « aide » pour voir les arrêts que je connais.'
};

export function validateMessage(raw) {
  if (typeof raw !== 'string') {
    return { ok: false, error: 'Le message doit être du texte.' };
  }
  const value = raw.trim();
  if (value === '') {
    return { ok: false, error: 'Le message ne doit pas être vide.' };
  }
  if (value.length > LIMITE) {
    return { ok: false, error: `Le message doit contenir ${LIMITE} caractères au maximum.` };
  }
  return { ok: true, value };
}

export function replyTo(message) {
  const texte = String(message).trim().toLowerCase();
  if (texte === 'salut' || texte === 'bonjour') {
    return REPONSES.salut;
  }
  if (texte === 'aide') {
    return REPONSES.aide;
  }
  if (texte === 'test') {
    return REPONSES.test;
  }
  if (Object.hasOwn(MOTS, texte)) {
    return MOTS[texte];
  }
  // Message inconnu : un repli distinct, qui renvoie vers « aide ».
  return REPONSES.repli;
}

// Vrai si le message contient au moins deux lettres et aucune minuscule.
// Les accents comptent comme des lettres (« OÙ »), les chiffres et la ponctuation non.
export function estEnMajuscules(message) {
  if (typeof message !== 'string') {
    return false;
  }
  const lettres = message.match(/\p{L}/gu) ?? [];
  return lettres.length >= 2 && !/\p{Ll}/u.test(message);
}

// Nombre de mots du message : tout groupe d'espaces, tabulations ou retours à la ligne sépare deux mots.
export function compterMots(message) {
  if (typeof message !== 'string') {
    return 0;
  }
  const texte = message.trim();
  return texte === '' ? 0 : texte.split(/\s+/).length;
}
