# Introduction

Tutoriel vous présentant une pico-bibliothèque que j'ai créée, afin de simplifier, à l'extrême, l'utilisation de l'AJAX,
pour récupérer des ressources HTML, XML ou SVG.

# Pourquoi une nouvelle bibliothèque orientée rendu serveur ?

De nos jours, avec des bibliothèques telles que React, Vue.js, etc., on a tendance à repousser le rendu côté client, ce
qui peut entraîner des applications moins fluides, plus énergivores (criminel à l'ère du mobile, selon moi), ne
bénéficiant (presque) pas des possibilités de mise en cache, intelligence logicielle divisée entre la partie serveur et
client, multiplication des modes de rendu (notamment, pour supporter les clients n'exécutant pas le JavaScript, tels les
moteurs de recherche), ...

Vous l'aurez sans doute compris, ce n'est pas la philosophie d'anticore, bien au contraire, même s'il vous est possible
de répartir cette intelligence logicielle, combinée avec cette bibliothèque.

La logique est donc tout autre, partant de l'idée qu'un script côté client ne devrait servir qu'à améliorer l'expérience
utilisateur (requêtes AJAX, réaction à des évènements, prévalidation de formulaires, ajout/remplacement d'éléments dans
le DOM et éventuellement animations en ajoutant/retirant des classes css).

# Qu'apporte, concrètement, cette nouvelle bibliothèque ?

Assurément, anticore va vous pousser structurer votre code JavaScript assez différemment de ce que vous avez pu
connaître jusqu'ici.

* Meilleure lisibilité, grâce à une structure plus modulaire (middlewares)
* Meilleure maintenabilité, grâce au caractère indépendant de chaque middleware
* Réduction de la charge de travail, côté front (vous ne vous souciez plus de la création de chaque requête AJAX, du
traitement de leur réponse, pas besoin de contrôle de la réponse afin de voir si elle correspond bien à ce qu'on
attendait)
* Aucune intelligence logicielle, côté client, le contrôle est donc centralisé côté serveur
* Possibilité aisée de traiter des éléments de réponses, de manière générique comme de manière plus ciblée
* Pas d'urls dans les sources JavaScript, simplifiant notamment la gestion de sites multilingues
* Non-obstrusive JavaScript, les pages de votre site restent fonctionnelles sans JavaScript
* Bibliothèque très légère 3-4 Ko
* Pas de dépendances (sauf pour les navigateurs obsolètes)

# Installation

## Via NPM
```sh
npm install anticore --prefix dossier-de-votre-choix
```

## Via GIT

```sh
git clone https://github.com/Lcfvs/anticore.git dossier-de-votre-choix
```

## Via une balise &lt;script>&lt;/script>

```html
<script src="https://cdn.rawgit.com/Lcfvs/anticore/1.5.7/anticore.min.js"></script>
```

# Étapes du processus

* Chargement du document et des scripts
* Déclaration des middlewares `ancitore.on(selector, middleware)`
* Optionnellement, déclaration des middlewares par défaut `anticore.defaults()`
  * écoute du clic sur un lien, pour en faire un appel AJAX
  * écoute de la soumission d'un formulaire, pour en faire un appel AJAX
* Optionnellement, application des middlewares correspondants à des éléments contenus dans le document chargé
`anticore.populate()`
* Lors de toute réponse AJAX (ou d'éléments présents dans la page, dans le cas du `.populate()`), pour chaque middleware
  * pour chaque élément correspondant au sélecteur du middleware
  (**à ce stade, les éléments chargés en AJAX n'ont pas encore été ajoutés au document**)
    * application du middleware sur l'élément
      * opérations sur l'élément (par exemple ajout de l'élément ou remplacement d'un élément existant au document)
      * passage à l'élément/middleware suivant `next()`
      
# Structure du code client

```js
void function(global) {
  'use strict';
  
  var
  anticore = global.anticore;

  anticore.on('query-selector', function(element, next, loaded) {
    // vos opérations sur l'élément ciblé ici
    
    next();
  });

  anticore.on('another-query-selector', function(element, next, loaded) {
    // vos opérations sur l'élément ciblé ici
    
    next();
  });

  anticore.on('another-query-selector-again', function(element, next, loaded) {
    // vos opérations sur l'élément ciblé ici
    
    next();
  });

  anticore.defaults();
  anticore.populate();
}(this);
```

Ou la version chaînée

```js
void function(global) {
  'use strict';
  
  global.anticore
  // 1er middleware
  .on('query-selector', function(element, next, loaded) {
    // vos opérations sur l'élément ciblé ici
    
    next();
  })
  // 2ème middleware
  .on('another-query-selector', function(element, next, loaded) {
    // vos opérations sur l'élément ciblé ici
    
    next();
  })
  // 3ème middleware
  .on('another-query-selector-again', function(element, next, loaded) {
    // vos opérations sur l'élément ciblé ici
    
    next();
  })
  .defaults()
  .populate();
}(this);
```

Vous pouvez aussi déclarer vos middlewares en modules (fichiers) distincts

```js
// module du 1er middleware
void function(global) {
  'use strict';
  
  global.anticore
  .on('query-selector', function(element, next, loaded) {
    // vos opérations sur l'élément ciblé ici
    
    next();
  });
}(this);
```

```js
// module du 2ème middleware
void function(global) {
  'use strict';
  
  global.anticore
  .on('another-query-selector', function(element, next, loaded) {
    // vos opérations sur l'élément ciblé ici
    
    next();
  });
}(this);
```

```js
// module du 3ème middleware
void function(global) {
  'use strict';
  
  global.anticore
  .on('another-query-selector-again', function(element, next, loaded) {
    // vos opérations sur l'élément ciblé ici
    
    next();
  });
}(this);
```

```js
// module d'initialisation (à charger en dernier)
// peut être remplacé par l'ajout d'une balise script chargeant https://cdn.rawgit.com/Lcfvs/anticore/1.5.7/middlewares/defaults-and-populate.md.min.js
void function(global) {
  'use strict';
  
  global.anticore.defaults().populate();
}(this);
```



# Premiers pas

Dans `dossier-de-votre-choix/demos`, vous trouverez les sources des exemples suivants, accessibles via
`dossier-de-votre-choix/demos/index.html` dans votre navigateur.

## Exemple basique (basic)

### Démo

[https://cdn.rawgit.com/Lcfvs/anticore/1.5.7/demos/basic/index.html](https://cdn.rawgit.com/Lcfvs/anticore/1.5.7/demos/basic/index.html)

### [`demos/basic/index.html`](../../demos/basic/index.html)

Dans le body, nous avons un menu de navigation et une section principale

```html
<header>
    <h1>basic::demos::anticore</h1>
    <nav>
        <ol>
            <li><a class="current" href="">Load the main section</a></li>
            <li><a href="form.html">Load the form section</a></li>
        </ol>
    </nav>
</header>
<main>
    <h1>This is the main section</h1>
    <p>some text</p>
</main>
```

### [`demos/basic/fragments/section.html`](../../demos/basic/fragments/section.html)

Un fragment de document pouvant être appelé en AJAX

```html
<main>
    <h1>This is the main section</h1>
    <p>some text</p>
</main>
```

### [`demos/basic/fragments/form.html`](../../demos/basic/fragments/form.html)

Un autre fragment de document pouvant être appelé en AJAX

```html
<main>
    <h1>This is the form section</h1>
    <form action="main-form.html" method="get">
        <fieldset>
            <p><label>Enter something <input /></label></p>
        </fieldset>
    </form>
</main>
```

### [`demos/basic/assets/js/change-current-nav-anchor.md.js`](../../demos/basic/assets/js/change-current-nav-anchor.md.js)

Middleware servant à remplacer le main de la page, par celui obtenu en AJAX

```js
anticore.on('main', function(element, next, loaded) {
  // s'il ne s'agit pas d'un élément chargé en AJAX, on ne fait rien et on passe au suivant
  if (!loaded) {
    return next();
  }

  let
  main = $('main');

  main.parentNode.replaceChild(element, main);

  next();
});
```

### [`demos/basic/assets/js/main-replacer.md.js`](../../demos/basic/assets/js/main-replacer.md.js)

Middleware servant à définir le lien courant, lorsqu'on clique dessus (ajout de `.current`)

```js
anticore.on('nav a', function () {
  function changeCurrent(event) {
    let
    element = event.target;

    $('.current', element.parentNode.parentNode).classList.remove('current');
    element.classList.add('current');
  }

  return function(element, next) {
    element.addEventListener('click', changeCurrent);

    next();
  };
}());
```

Notez, ici, l'encapsulation de la fonction `changeCurrent()`, afin de pouvoir rendre ce middleware indépendant.


## Exemple de validation de formulaire, par le serveur (validation)

### Démo

[https://cdn.rawgit.com/Lcfvs/anticore/1.5.7/demos/validation/index.html](https://cdn.rawgit.com/Lcfvs/anticore/1.5.7/demos/validation/index.html)

### [`demos/validation/index.html`](../../demos/validation/index.html)

Dans le body, nous avons une section contenant un formulaire

```html
<header>
    <h1>validation::demos::anticore</h1>
</header>
<main>
    <form name="user" action="response.html" method="post">
        <fieldset>
            <p>
                <label for="username">Username</label>
                <input id="username" placeholder="Lcf.vs" />
            </p>
            <p>
                <label for="country">Country</label>
                <select id="country">
                    <option value="Belgium" selected="selected">Belgium</option>
                    <option value="France">France</option>
                    <option value="Other">Other</option>
                </select>
            </p>
        </fieldset>
        <button type="submit" class="save">Save</button>
    </form>
</main>
```

### [`demos/validation/fragments/response.html`](../../demos/validation/fragments/response.html)

Un fragment HTML contenant des messages d'erreurs de validation, pouvant être appelé en AJAX

```html
<span class="error" data-for="#username">Invalid username</span>
<span class="error" data-for="#country">Invalid country</span>
```

Notez l'attribut `data-for`, à titre d'exemple, contenant un sélecteur permettant de cibler l'élément auquel le
message d'erreur correspond.

### [`demos/validation/assets/js/on-validation-error.md.js`](../../demos/validation/assets/js/on-validation-error.md.js)

Le middleware interceptant les messages d'erreurs, en récupérant le sélecteur dans l'attribut `data-for`, afin de savoir
où l'injecter

```js
anticore.on('.error[data-for]', function(element, next) {
  let
  target = element.dataset.for,
  field = $(target);

  field.parentNode.insertBefore(element, field);

  next();
});
```

## Exemple de grille composants à mettre à jour (messages)

### Démo

[https://cdn.rawgit.com/Lcfvs/anticore/1.5.7/demos/messages/index.html](https://cdn.rawgit.com/Lcfvs/anticore/1.5.7/demos/messages/index.html)

### [`demos/messages/index.html`](../../demos/messages/index.html)

Dans le body, nous avons une section contenant un compteur de nouveaux messages et une liste de messages déjà lus

```html
<header>
    <h1>messages::demos::anticore</h1>
</header>
<main id="messages">
    <h1>Messages <span class="notifications"><strong id="notificationCount">3 <a href="response.html">↺</a></strong></span></h1>
    <section class="message">
        <h1>Message 1 title</h1>
        <h1>This is the message 1 content</h1>
    </section>
    <section class="message">
        <h1>Message 2 title</h1>
        <h1>This is the message 2 content</h1>
    </section>
    <section class="message">
        <h1>Message 3 title</h1>
        <h1>This is the message 3 content</h1>
    </section>
</main>
```

### [`demos/messages/fragments/response.html`](../../demos/messages/fragments/response.html)

Un fragment HTML contenant une liste de composants à mettre à jour, pouvant être appelé en AJAX

```html
<strong id="notificationCount">0</strong>
<section class="message new">
    <h1>New message 1 title</h1>
    <h1>This is the new message 1 content</h1>
</section>
<section class="message new">
    <h1>New message 2 title</h1>
    <h1>This is the new message 2 content</h1>
</section>
<section class="message new">
    <h1>New message 3 title</h1>
    <h1>This is the new message 3 content</h1>
</section>
```

### [`demos/messages/assets/js/notification-count-updater.md.js`](../../demos/messages/assets/js/notification-count-updater.md.js)

Un middleware permettant de mettre à jour le compteur de notifications

```js
anticore.on('#notificationCount', function(element, next) {
  let
  notificationCount = $('#notificationCount');

  notificationCount.parentNode.replaceChild(element, notificationCount);

  next();
})
```

### [`demos/messages/assets/js/message-reader.md.js`](../../demos/messages/assets/js/message-reader.md.js)

Un middleware interceptant les nouveaux messages, les ajoutant à la liste, avec un délai de 0.3 ms entre chaque ajout

```js
anticore.on('.message', function(element, next, loaded) {
  if (!loaded) {
    return next();
  }

  let
  main = $('main#messages');

  main.appendChild(element);

  setTimeout(next, 300);
});
```