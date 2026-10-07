// Cap Web — réseau de bus et de tram fictif, et calcul du meilleur trajet. Fonctions pures : aucun accès à la page.

// Arrêts : nom affiché, position sur la carte (x, y) et position de l'étiquette (lx, ly, ancre).
const ARRETS = {
  gare: { nom: 'Gare', x: 80, y: 200, lx: 80, ly: 183, ancre: 'middle' },
  marche: { nom: 'Marché', x: 200, y: 200, lx: 200, ly: 183, ancre: 'middle' },
  'hotel-de-ville': { nom: 'Hôtel de Ville', x: 320, y: 200, lx: 332, ly: 222, ancre: 'start' },
  universite: { nom: 'Université', x: 440, y: 200, lx: 440, ly: 183, ancre: 'middle' },
  campus: { nom: 'Campus', x: 540, y: 200, lx: 540, ly: 183, ancre: 'middle' },
  fontaine: { nom: 'Fontaine', x: 320, y: 60, lx: 334, ly: 65, ancre: 'start' },
  cathedrale: { nom: 'Cathédrale', x: 320, y: 130, lx: 334, ly: 135, ancre: 'start' },
  parc: { nom: 'Parc', x: 320, y: 270, lx: 334, ly: 275, ancre: 'start' },
  stade: { nom: 'Stade', x: 320, y: 340, lx: 320, ly: 365, ancre: 'middle' },
  ruisseau: { nom: 'Ruisseau', x: 80, y: 340, lx: 80, ly: 365, ancre: 'middle' },
  moulin: { nom: 'Moulin', x: 140, y: 270, lx: 126, ly: 275, ancre: 'end' },
  ecoles: { nom: 'Écoles', x: 200, y: 340, lx: 200, ly: 365, ancre: 'middle' },
  hopital: { nom: 'Hôpital', x: 440, y: 340, lx: 440, ly: 365, ancre: 'middle' }
};

// Lignes : arrêts dans l'ordre du parcours.
const LIGNES = [
  { id: 'T1', nom: 'Tram T1', mode: 'tram', couleur: '#00775c', arrets: ['gare', 'marche', 'hotel-de-ville', 'universite', 'campus'] },
  { id: 'T2', nom: 'Tram T2', mode: 'tram', couleur: '#7a3e9d', arrets: ['fontaine', 'cathedrale', 'hotel-de-ville', 'parc', 'stade'] },
  { id: '12', nom: 'Bus 12', mode: 'bus', couleur: '#b34d0b', arrets: ['ruisseau', 'moulin', 'marche'] },
  { id: '30', nom: 'Bus 30', mode: 'bus', couleur: '#1f5fae', arrets: ['ruisseau', 'ecoles', 'stade', 'hopital', 'universite'] }
];

// Minutes entre deux arrêts voisins, et minutes perdues à chaque changement de ligne.
const DUREE_TRONCON = { tram: 2, bus: 3 };
export const DUREE_CORRESPONDANCE = 4;

export const RESEAU = { arrets: ARRETS, lignes: LIGNES };

// Les arrêts, triés par nom, pour les listes de choix.
export function listerArrets(reseau = RESEAU) {
  return Object.entries(reseau.arrets)
    .map(([id, arret]) => ({ id, nom: arret.nom }))
    .sort((a, b) => a.nom.localeCompare(b.nom, 'fr'));
}

// Clé d'un tronçon entre deux arrêts voisins d'une ligne, la même dans les deux sens.
export function cleTroncon(ligne, a, b) {
  return a < b ? `${ligne}:${a}:${b}` : `${ligne}:${b}:${a}`;
}

// Meilleur trajet de depart à arrivee : le plus court en minutes, correspondances comprises.
// Renvoie null si un arrêt est inconnu ou si aucun trajet n'existe.
export function calculerItineraire(depart, arrivee, reseau = RESEAU) {
  if (!Object.hasOwn(reseau.arrets, depart) || !Object.hasOwn(reseau.arrets, arrivee)) {
    return null;
  }
  if (depart === arrivee) {
    return { etapes: [], duree: 0, correspondances: 0 };
  }

  // Voisins de chaque arrêt, ligne par ligne, dans les deux sens.
  const voisins = {};
  for (const ligne of reseau.lignes) {
    const duree = DUREE_TRONCON[ligne.mode];
    ligne.arrets.forEach((arret, i) => {
      const suivant = ligne.arrets[i + 1];
      if (suivant === undefined) {
        return;
      }
      (voisins[arret] ??= []).push({ vers: suivant, ligne: ligne.id, duree });
      (voisins[suivant] ??= []).push({ vers: arret, ligne: ligne.id, duree });
    });
  }

  // Dijkstra sur des états « arrêt + ligne empruntée », pour compter le temps des correspondances.
  const cle = (arret, ligne) => `${arret}|${ligne}`;
  const distances = new Map([[cle(depart, ''), 0]]);
  const precedents = new Map();
  const aTraiter = [{ arret: depart, ligne: '', duree: 0 }];
  const traites = new Set();
  let fin = null;

  while (aTraiter.length > 0) {
    aTraiter.sort((a, b) => a.duree - b.duree);
    const courant = aTraiter.shift();
    const cleCourante = cle(courant.arret, courant.ligne);
    if (traites.has(cleCourante)) {
      continue;
    }
    traites.add(cleCourante);
    if (courant.arret === arrivee) {
      fin = courant;
      break;
    }
    for (const voisin of voisins[courant.arret] ?? []) {
      const change = courant.ligne !== '' && courant.ligne !== voisin.ligne;
      const duree = courant.duree + voisin.duree + (change ? DUREE_CORRESPONDANCE : 0);
      const cleVoisin = cle(voisin.vers, voisin.ligne);
      if (duree < (distances.get(cleVoisin) ?? Infinity)) {
        distances.set(cleVoisin, duree);
        precedents.set(cleVoisin, courant);
        aTraiter.push({ arret: voisin.vers, ligne: voisin.ligne, duree });
      }
    }
  }

  if (fin === null) {
    return null;
  }

  // Remonte le chemin, de l'arrivée au départ.
  const chemin = [];
  for (let etat = fin; etat !== undefined; etat = precedents.get(cle(etat.arret, etat.ligne))) {
    chemin.unshift(etat);
  }

  // Regroupe les arrêts consécutifs d'une même ligne en étapes.
  const etapes = [];
  for (let i = 1; i < chemin.length; i += 1) {
    const { arret, ligne } = chemin[i];
    const derniere = etapes.at(-1);
    if (derniere && derniere.ligne === ligne) {
      derniere.arrets.push(arret);
      derniere.vers = arret;
    } else {
      etapes.push({ ligne, de: chemin[i - 1].arret, vers: arret, arrets: [chemin[i - 1].arret, arret] });
    }
  }
  for (const etape of etapes) {
    const ligne = reseau.lignes.find((l) => l.id === etape.ligne);
    const sensAller = ligne.arrets.indexOf(etape.vers) > ligne.arrets.indexOf(etape.de);
    etape.direction = sensAller ? ligne.arrets.at(-1) : ligne.arrets[0];
  }

  return { etapes, duree: fin.duree, correspondances: etapes.length - 1 };
}

// Une étape en une phrase : « Tram T1 de Gare à Université, direction Campus (3 arrêts). »
export function decrireEtape(etape, reseau = RESEAU) {
  const ligne = reseau.lignes.find((l) => l.id === etape.ligne);
  const nom = (id) => reseau.arrets[id].nom;
  const nombre = etape.arrets.length - 1;
  return `${ligne.nom} de ${nom(etape.de)} à ${nom(etape.vers)}, direction ${nom(etape.direction)} (${nombre} arrêt${nombre > 1 ? 's' : ''}).`;
}

// Le trajet en une phrase de résumé.
export function resumerItineraire(itineraire, depart, arrivee, reseau = RESEAU) {
  const nom = (id) => reseau.arrets[id]?.nom ?? id;
  if (itineraire === null) {
    return `Aucun trajet trouvé entre ${nom(depart)} et ${nom(arrivee)}.`;
  }
  if (itineraire.etapes.length === 0) {
    return `Vous êtes déjà à ${nom(depart)}.`;
  }
  const changements = itineraire.correspondances === 0
    ? 'sans correspondance'
    : `${itineraire.correspondances} correspondance${itineraire.correspondances > 1 ? 's' : ''}`;
  return `De ${nom(depart)} à ${nom(arrivee)} : environ ${itineraire.duree} minutes, ${changements}.`;
}
