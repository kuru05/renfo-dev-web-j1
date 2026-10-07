// Cap Web — affichage de la carte du réseau et du trajet. Aucun calcul de trajet ici.
import { cleTroncon } from './reseau.js';

const SVG = 'http://www.w3.org/2000/svg';

function creer(nom, attributs = {}) {
  const element = document.createElementNS(SVG, nom);
  for (const [cle, valeur] of Object.entries(attributs)) {
    element.setAttribute(cle, String(valeur));
  }
  return element;
}

// Dessine le plan complet : les lignes, puis les arrêts et leurs noms.
// choisirArret(id) est appelé quand on clique sur un arrêt.
export function dessinerCarte(svg, reseau, choisirArret) {
  const lignesParArret = {};
  for (const ligne of reseau.lignes) {
    for (const arret of ligne.arrets) {
      (lignesParArret[arret] ??= []).push(ligne.id);
    }
  }

  const traces = creer('g', { class: 'traces' });
  for (const ligne of reseau.lignes) {
    ligne.arrets.forEach((arret, i) => {
      const suivant = ligne.arrets[i + 1];
      if (suivant === undefined) {
        return;
      }
      const a = reseau.arrets[arret];
      const b = reseau.arrets[suivant];
      const trace = creer('line', { x1: a.x, y1: a.y, x2: b.x, y2: b.y, stroke: ligne.couleur, class: 'troncon' });
      trace.dataset.troncon = cleTroncon(ligne.id, arret, suivant);
      traces.append(trace);
    });
  }

  const arrets = creer('g', { class: 'arrets' });
  for (const [id, arret] of Object.entries(reseau.arrets)) {
    const groupe = creer('g', { class: 'arret' });
    groupe.dataset.arret = id;
    const correspondance = (lignesParArret[id]?.length ?? 0) > 1;
    groupe.append(creer('circle', { cx: arret.x, cy: arret.y, r: correspondance ? 8 : 6, class: correspondance ? 'pastille correspondance' : 'pastille' }));
    const nom = creer('text', { x: arret.lx, y: arret.ly, 'text-anchor': arret.ancre });
    nom.textContent = arret.nom;
    groupe.append(nom);
    const titre = creer('title');
    titre.textContent = `${arret.nom} : choisir cet arrêt`;
    groupe.append(titre);
    groupe.addEventListener('click', () => choisirArret(id));
    arrets.append(groupe);
  }

  // Le titre du plan (lu par les lecteurs d'écran) reste en place.
  const titre = svg.querySelector(':scope > title');
  svg.replaceChildren(...(titre ? [titre] : []), traces, arrets);
}

// La légende des lignes : pastille de couleur, nom et terminus.
export function dessinerLegende(liste, reseau) {
  const elements = reseau.lignes.map((ligne) => {
    const li = document.createElement('li');
    const pastille = document.createElement('span');
    pastille.className = 'pastille-ligne';
    pastille.style.background = ligne.couleur;
    pastille.textContent = ligne.id;
    const premier = reseau.arrets[ligne.arrets[0]].nom;
    const dernier = reseau.arrets[ligne.arrets.at(-1)].nom;
    li.append(pastille, ` ${ligne.nom} : ${premier} – ${dernier}`);
    return li;
  });
  liste.replaceChildren(...elements);
}

// Met le trajet en évidence sur la carte ; sans trajet, tout le réseau redevient visible.
export function surlignerItineraire(svg, itineraire, depart, arrivee) {
  const actifs = new Set();
  const arretsActifs = new Set([depart, arrivee]);
  for (const etape of itineraire?.etapes ?? []) {
    etape.arrets.forEach((arret, i) => {
      arretsActifs.add(arret);
      const suivant = etape.arrets[i + 1];
      if (suivant !== undefined) {
        actifs.add(cleTroncon(etape.ligne, arret, suivant));
      }
    });
  }
  svg.classList.toggle('trajet', Boolean(itineraire && itineraire.etapes.length > 0));
  for (const trace of svg.querySelectorAll('.troncon')) {
    trace.classList.toggle('actif', actifs.has(trace.dataset.troncon));
  }
  for (const groupe of svg.querySelectorAll('.arret')) {
    const id = groupe.dataset.arret;
    groupe.classList.toggle('actif', arretsActifs.has(id));
    groupe.classList.toggle('depart', id === depart);
    groupe.classList.toggle('arrivee', id === arrivee);
  }
}

// Ajoute un choix par arrêt dans une liste déroulante, après le choix vide.
export function remplirListeArrets(select, arrets) {
  for (const arret of arrets) {
    const option = document.createElement('option');
    option.value = arret.id;
    option.textContent = arret.nom;
    select.append(option);
  }
}

// Les étapes du trajet, une ligne par étape, en texte.
export function afficherEtapes(liste, phrases) {
  liste.replaceChildren(...phrases.map((phrase) => {
    const li = document.createElement('li');
    li.textContent = phrase;
    return li;
  }));
}
