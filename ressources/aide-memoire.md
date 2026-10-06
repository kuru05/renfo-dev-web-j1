# Aide-mémoire J1

À consulter pendant les checkpoints. Ces repères donnent les notions nécessaires pour essayer, avec de petits exemples distincts du projet Cap Web.

## Le contrat de Cap Web

Le formulaire du projet limite un message, avec `maxlength`, à la limite de votre cahier personnel, et demande une saisie avec `required`. Le JavaScript vérifie aussi le texte après `trim()` : un champ rempli uniquement d'espaces ne constitue pas un message utile. Le HTML se contourne : la règle qui compte est celle de `brain.js`.

## Étiquette associée

Autre contexte, profil :

```html
<label for="pseudo">Pseudo</label>
<input id="pseudo" name="pseudo" type="text">
```

Le clic sur le texte donne le focus au champ quand `for` égale `id`.

## Bouton d'envoi

Autre contexte, lettre d'info :

```html
<button type="submit">Valider</button>
```

Dans un formulaire, `type="submit"` déclenche la soumission par clic ou activation du bouton au clavier. `type="button"` ne l'envoie pas, il sert aux actions JS.

## Boîte et largeur souple

Autre contexte, carte :

```css
.carte {
  box-sizing: border-box;
  max-width: 40rem;
  padding: 1rem;
}
```

Avec `border-box`, bordure et remplissage restent dans la largeur déclarée. Une largeur fluide avec `max-width` limite les grandes lignes ; il faut aussi contrôler le calcul de boîte et les mots trop longs. Vérifie toujours le résultat à petite largeur.

## Titres et zone principale

Dans ce projet, un seul `h1` par page par convention pour garder un repère simple, ce n'est pas une règle universelle du web. Les `h2` suivent dans l'ordre, sans saut, et `main` regroupe le contenu principal. Remplacer `main` par `div` retire le repère principal ; le style peut aussi changer si un sélecteur CSS vise `main`. La sémantique et la présentation se vérifient séparément.

## Liste et statut

Une liste vide ne contient encore aucun message à annoncer. Une région `role="status"` permet l’annonce de ses mises à jour sans déplacer le focus. Dans Cap Web, conserve une seule occurrence de l’identifiant `status`.

## Empiler, espacer, couper les mots

Autre contexte, un panneau d’options :

```css
.panneau {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.description { overflow-wrap: break-word; }
:focus-visible { outline: 3px solid #0b5fff; outline-offset: 2px; }
```

Observe quel élément porte `display: flex` : ses enfants directs sont disposés en colonne. `gap` les espace. Le contour rend la position du clavier visible.

Dans un `textarea`, Entrée crée une nouvelle ligne ; pour soumettre, rejoins le bouton avec Tab puis active-le avec Entrée.
