# anticore

[![npm](https://img.shields.io/npm/v/anticore.svg?style=plastic)]()
[![Downloads](https://img.shields.io/npm/dt/anticore.svg?style=plastic)]()

The easiest middleware manager for AJAX requests, for around 4Ko!


## Why?

In a classical website using AJAX to make the user navigation, we have a lot of functions linked together by callbacks to make something on the server response.
 
In that case, we have a lot of nested functions, on the road of the callback hell... which can be resolved by the promises...

... it's ok, problem solved for the nested functions but still stitched together and it requires a lot of investigations as soon as we need to add/remove a feature to be sure that don't break our code.

Moreover, when our script calls the server, the requested view can be removed resulting by a 404, an internal error resulting by a 500, the user's session can be expired, etc. then we need to control the server response, adding a useless & repetitive treatment.

Lemme show you how to cut it. ;)


## The solution? 

It's fairly simple: **why not just wait something to treat?**

It really can help your code to be simple as possible.

[Basic demo, based on the following examples](https://jsfiddle.net/k6gm2pss/)

[Form validation demo (short version)](http://jsfiddle.net/nqkjorrw/)

[Form validation demo (long version)](http://jsfiddle.net/ws8et928/)



## How?

The idea consists only to create some listeners at the page load:
 
```JS
anticore
  .on(querySelector, listener);
```

When needed, make a AJAX call:
 
```JS
anticore
  .fetcher(element)
  .fetch(anticore.trigger);
```

And... why and? that's all!


## Requirements

All you need is the support of the natives

* **ES2015** [`Promise`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
* [`window.fetch`](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) API
* [URL](https://github.com/inexorabletash/polyfill/blob/master/url.js)


## Install

```HTML
<script src="https://cdn.rawgit.com/Lcfvs/anticore/1.8.3/anticore.min.js"></script>
```

You can also install it from npm

`npm install anticore`


## Usage

### Prepare the HTML

For the following examples, suppose we have a simple web page like:
 
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
          <li><a href="/section">Reload the main section</a></li>
          <li><a href="/form">Load the form</a></li>
        </ol>
      </nav>
    </header>
    <main>
      <section class="mainSection">
        <h1>This is the main section</h1>
      </section>
    </main>
    <script src="https://cdn.rawgit.com/Lcfvs/anticore/1.8.3/anticore.min.js"></script>
  </body>
</html>
```

Where the `/section` returns:

```HTML
<section class="mainSection">
  <h1>This is the main section</h1>
</section>
```

And the `/form` returns:

```HTML
<form class="mainForm" action="/form" method="post">
  <fieldset>
    <p><label>Enter something <input /></label></p>
  </fieldset>
</form>
```

### Register your middlewares

#### The app specific middlewares

```JS
// an optional middleware useful for specific page load operations
anticore.on('body', function(element, next) {
  // do something if necessary

  // then let the next middleware to resolve, if any
  next();
});
```

```JS
// a middleware to handle the main section
anticore.on('.mainSection', function(element, next, loaded) {
  // if the found element is already in the document (then not from an AJAX Request)
  if (!loaded) {
      // do something if necessary
      // then let the next middleware to resolve, if any
      return next();
  }

  // gets the current main section (already in the document)
  let mainSection = document.querySelector('.mainSection');
  
  // replace the current main section by the new one
  mainSection.parentNode.replaceChild(element, mainSection);

  // then let the next middleware to resolve, if any
  next();
});
```

```JS
// a middleware to handle the main form
anticore.on('.mainForm', function(element, next) {
  // gets the current main section (already in the document)
  let mainSection = document.querySelector('.mainSection');
  // gets the current main form (already in the document)
  let mainForm = mainSection.querySelector('.mainForm');

  if (mainForm) {
      // replace the current main form, if any, by the new one
      mainSection.replaceChild(element, mainForm);
  } else {
      // else append to the main section
      mainSection.appendChild(element);
  }

  // then let the next middleware to resolve, if any
  next();
});
```

#### The generic middlewares

**Let them at your declarations end**

```JS
// a middleware to turn anchors in AJAX requests
anticore.on('a:not([download]):not([target]),a[target=_self]:not([download])', function(element, next) {
  // listen the click
  element.addEventListener('click', anticore.fetchFromEvent);

  // then let the next middleware to resolve, if any
  next();
});
```

```JS
// a middleware to turn forms in AJAX requests
anticore.on('form', function(element, next) {
  // listen the submit
  element.addEventListener('submit', anticore.fetchFromEvent);

  // then let the next middleware to resolve, if any
  next();
});
```

In place of those 2 middlewares, you can also call the `defaults()` method :

```JS
anticore.defaults();
```

Note the `defaults()` also clean all elements with a `.error` class in a previously submitted form, before fetching it


### Trigger the middlewares on the existing elements

```JS
anticore.populate(document);
```

Or to use the scoped document

```JS
anticore.populate();
```


## Advanced usage

### Optional methods on the requests
```JS
anticore
  .fetcher(element)
  // add the existing cookies to the request
  .credentials() 
  // add a header to the request
  .header('header-name', 'header-value')
  // add an option to the request
  .option('option-name', 'option-value')
  // add an field value to the request body (on post requests)
  .body('field-name', 'field-value')
  .fetch(anticore.trigger);
```

### Make a request without element dependency

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

### Extend the fetcher to handle your elements as you want, based on the tag name

```JS
anticore
  .fetchers.button = function(button) {
    return anticore.request(button.dataset.href, 'get');
  };

// Then you can add a generic middleware like for the anchors
anticore.on('button', function(element, next) {
  // listen the click
  element.addEventListener('click', anticore.fetchFromEvent);

  // then let the next middleware to resolve, if any
  next();
});
```


### Fetching mode

The fetching mode is based on the request `content-type`, these rules are followed

* `blob`: by default
* `html`: if the `content-type` contains `html` or `svg` or `xml`
* `json`: if the `content-type` contains `json`
* `text`: if the `content-type` contains `text/plain`

But if you want to treat `blob`, `json` or `text`, you need to create your own logic for these types (the .trigger)


Example:

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

The server can respond what it wants, it can respond 0, 1, 2, ... view components, we don't care!

Each middleware makes only its own tasks if an element matches... or nothing if not and isn't affected by the others.

Imagine your page as a view components list, like a grid, for example.

Imagine too that when we call `/what-s-new-to-fetch` the server checks what components need to refresh and bundles all the elements in one unique response... all the elements are treated, even if they aren't in a specific order.

Enjoy :)


## Utils

### `anticore.utils.create(prototype = null, descriptors = undefined)`

Standalone `Object.create` which can have no args

### `anticore.utils.demethodize(method, ...bindParams)`

Returns a standalone function from an object method

### `anticore.utils.forEach(iterable, callback, thisArg = undefined)`

Standalone `Array.prototype.forEach` shortcut

### `anticore.utils.$(selector, refNode = document)`

Standalone `node.querySelector` shortcut

### `anticore.utils.$$(selector, refNode = document)`

Standalone `node.querySelectorAll` shortcut 

## License

Copyright MIT 2017 Lcf.vs
https://github.com/Lcfvs/anticore