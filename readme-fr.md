# anticore

[![npm](https://img.shields.io/npm/v/anticore.svg?style=plastic)]()
[![Downloads](https://img.shields.io/npm/dt/anticore.svg?style=plastic)]()

Le plus simple gestionnaire de requêtes AJAX, pour environ 3Ko !


## Pourquoi ?

Sur un site classique utilisant l'AJAX pour la navigation de l'utilisateur, nous avons un tas de fonctions liées
ensemble par des callbacks pour traiter les réponses du serveur.
 
Dans ce cas, nous avons un tas de fonctions imbriquées, sur la route de ce qu'on nomme l'enfer du callback...
lequel peut être résolu par les promesses.

... ok, le problème des problème des fonctions imbriquées est donc résolu, néanmoins, elles sont toujours liées entre
elles, ce qui requiert des grandes investigations, dès que l'on souhaite ajouter/retirer certaines fonctionnalités,
afin d'être sûr de ne briser son code.

De plus, lorsqu'un script appelle le serveur, la réponse reçue peut ne pas correspondre à ce que l'on attendait,
telle une erreur 404, 500, etc., ajoutant la nécessité d'un traitement inutile, pour gérer ces exceptions.

Laissez-moi donc vous présenter une autre approche. ;)


## La solution ? 

C'est vraiment simple: **Pourquoi ne pas juste attendre d'avoir quelque chose à traiter ?**

Cela peut simplifier votre code au possible.

[Démo basique basée sur les exemples de ce readme](https://jsfiddle.net/k6gm2pss/)

[Validation de formulaires (version courte)](http://jsfiddle.net/nqkjorrw/)

[Validation de formulaires (version longue)](http://jsfiddle.net/ws8et928/)



## Comment ?

L'idée consiste uniquement en la création de listeners (middlewares), au chargement de la page :
 
```JS
anticore
  .on(querySelector, listener);
```

Ensuite... Pourquoi ensuite? c'est tout !


## Dépendances

Tout ce dont vous avez besoin, c'est le support navigateur de ces 2 éléments :

* **ES2015** [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
* [`window.fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API.

Vous devez assurer un support pour les anciens navigateurs ? Pas de problème, il existe un [polyfill](https://github.com/github/fetch).


## Installation

```HTML
<script src="https://cdn.rawgit.com/Lcfvs/anticore/1.4.8/anticore.min.js"></script>
```

Vous pouvez aussi l'installer depuis NPM :

`npm install anticore`


## Utilisation

### Préparation de l'HTML

Pour les exemples suivants, considérez que votre page HTML resemble à ceci :
 
```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>anticore demo</title>
  </head>
  <body>
    <header>
      <h1>anticore demo</h1>
      <nav>
        <ol>
          <li><a href="/section">Recharger la section principale</a></li>
          <li><a href="/form">Charger le formulaire</a></li>
        </ol>
      </nav>
    </header>
    <main>
      <section class="mainSection">
        <h1>Ceci est la section principale</h1>
      </section>
    </main>
    <script src="https://cdn.rawgit.com/Lcfvs/anticore/1.4.8/anticore.min.js"></script>
  </body>
</html>
```

Où un appel vers `/section` renvoie :

```HTML
<section class="mainSection">
  <h1>Ceci est la section principale</h1>
</section>
```

Et un appel vers `/form` renvoie:

```HTML
<form class="mainForm" action="/form" method="post">
  <fieldset>
    <p><label>Entrez quelque chose : <input /></label></p>
  </fieldset>
</form>
```

### Déclarez vos middlewares

#### Les middlewares spécifiques à l'application

```JS
// un middleware optionnel pour traiter le chargement de la page
anticore.on('body', function(element, next) {
  // opérations...

  // ensuite, permettons au middleware suivant de s'exécuter, si nécessaire
  next();
});
```

```JS
// un middleware servant à traiter la section principale
anticore.on('.mainSection', function(element, next, loaded) {
  // si le noeud existe déjà dans le document (ne provenant pas d'une requête AJAX)
  // opérations...

  if (!loaded) {
  // ensuite, permettons au middleware suivant de s'exécuter, si nécessaire
      return next();
  }

  // récupérons la section existante (présente dans le document)
  let mainSection = document.querySelector('.mainSection');
  
  // remplaçons l'existante par celle reçue
  mainSection.parentNode.replaceChild(element, mainSection);

  // ensuite, permettons au middleware suivant de s'exécuter, si nécessaire
  next();
});
```

```JS
// un middleware servant à traiter le formulaire
anticore.on('.mainForm', function(element, next) {
  // récupérons la section existante (présente dans le document)
  let mainSection = document.querySelector('.mainSection');
  // récupérons le formulaire existant (présent dans le document)
  let mainForm = mainSection.querySelector('.mainForm');

  if (mainForm) {
      // remplaçons le formulaire existant par celui reçu
      mainSection.replaceChild(element, mainForm);
  } else {
      // sinon, ajoutons-le à la section principale
      mainSection.appendChild(element);
  }

  // ensuite, permettons au middleware suivant de s'exécuter, si nécessaire
  next();
});
```

#### Les middlewares génériques 

**Déclarez-les toujours en dernier**

```JS
// un middleware interceptant le clic sur une ancre, pour en déduire l'appel AJAX
anticore.on('a', function(element, next) {
  // on écoute le click
  element.addEventListener('click', anticore.fetchFromEvent);

  // ensuite, permettons au middleware suivant de s'exécuter, si nécessaire
  next();
});
```

```JS
// un middleware interceptant l'envoi d'un formulairee, pour en déduire l'appel AJAX
anticore.on('form', function(element, next) {
  // on écoute le submit
  element.addEventListener('submit', anticore.fetchFromEvent);

  // ensuite, permettons au middleware suivant de s'exécuter, si nécessaire
  next();
});
```

Au lieu de déclarer ces 2 middlewares, vous pouvez aussi appeler la methode `defaults()` :

```JS
anticore.defaults();
```

Notez que `defaults()` supprime les éléments ayant une classe `.error`, contenus dans un formulaire, avant de lancer
la requête AJAX.


### Exécuter les middlewares sur les noeuds existants

```JS
anticore.populate(document);
```

Ou, par défaut, sur le document courant

```JS
anticore.populate();
```


## Utilisation avancée

### Méthodes optionnelles
```JS
anticore
  .fetcher(element)
  // ajout des cookies à la requête
  .credentials() 
  // ajout d'un header à la requête
  .header('header-name', 'header-value')
  // ajouter une option à la requête
  .option('option-name', 'option-value')
  // ajout d'un champ au corps de la requête (POST)
  .body('field-name', 'field-value')
  .fetch(anticore.trigger);
```

### Créer une requête sans dépendance à un élément

```JS
// get request
anticore
  .request('/what-s-new-to-fetch', 'get')
  .fetch(anticore.trigger);
```

```JS
// post request
anticore
  .request('/what-s-new-to-fetch', 'post', new FormData(form))
  .fetch(anticore.trigger);
```

### Étendre le fonctionnement de la bibliothèque, pour gérer d'autres éléments, basé sur le nom de l'élément

```JS
anticore
  .fetchers.button = function(button) {
    return anticore.request(button.dataset.href, 'get');
  };

// Ensuite, vous pouvez intercepter
anticore.on('button', function(element, next) {
  // listen the click
  element.addEventListener('click', anticore.fetchFromEvent);

  // ensuite, permettons au middleware suivant de s'exécuter, si nécessaire
  next();
});
```


### Modes de parsing de données

Le mode de parsing est basé sur le header `content-type` renvoyé par le serveur, en voici les règles :

* `blob` : par défaut
* `html` : si le `content-type` contient `html` ou `svg` ou `xml`
* `json` : si le `content-type` contient `json`
* `text` : si le `content-type` contient `text/plain`

Mais si vous souhaitez intercepter des données de type `blob`, `json` ou `text`, vous devez créer votre propre
logique d'interception en passant un callback à `.fetch(handler)`


Exemple :

```JS
anticore
  .fetcher(element)
  .fetch(yourHandler);

// or

anticore
  .fetcher(element)
  .fetch()
  .then(yourHandler);
```


### The anticore's real power!

Le serveur peut renvoyer ce qu'il veut, 0, 1, 2, ... composants de vues, cela ne change rien !

Chaque middleware n'agira que sur chaque noeud qui correspond au sélecteur qui lui est associé... or rien, si ce
n'est pas le cas et chaque middleware est indépendant des autres.

Imaginez que la structure de votre page soit une liste de composants, par exemple.

Imaginez aussi que lorsqu'on appelle `/what-s-new-to-fetch`, le serveur vérifie quel(s) composant(s) nécessite d'être
actualisé et les regroupe en une seule réponse... chacun des éléments sera traité et, ce, même s'ils n'y apparaissent
pas dans un ordre spécifique.

À vous de jouer. :)


## Utils

### `anticore.utils.demethodize(method, ...bindParams)`

Retourne une fonction dérivée d'une méthode d'un objet

### `anticore.utils.create(prototype = null, descriptors = undefined)`

Dérivée de `Object.create`, utilisable sans arguments

### `anticore.utils.forEach(iterable, callback, thisArg = undefined)`

Dérivée de `Array.prototype.forEach`

### `anticore.utils.$(selector, refNode = document)`

Dérivée de `document.querySelector`

### `anticore.utils.$$(selector, refNode = document)`

Dérivée de `document.querySelectorAll` 

## License

Copyright MIT 2017 Lcf.vs
https://github.com/Lcfvs/anticore