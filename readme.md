# <a name="reference">anticore</a>

A generic living DOM library to simplify your client code, like with its easiest middleware manager for
AJAX requests.

## Install

`npm i -D anticore`

## Demos

* [Live demos](http://lcfvs.github.io/anticore)
* [Demo sources](https://github.com/Lcfvs/anticore/tree/gh-pages)

## Usage

```js
import {anticore} from 'anticore';
import {onClick} from 'anticore/dom/emitter/onClick';
import {closest} from 'anticore/dom/query/closest';
import {one} from 'anticore/dom/query/one';
import {append} from 'anticore/dom/tree/append';
import {remove} from 'anticore/dom/tree/remove';
import {replace} from 'anticore/dom/tree/replace';

function onClose(event) {
  remove(closest('.modal', event.target));
}

// middleware to treat a main element, loaded or contained by the current document
anticore.on('main', function(element, next, loaded) {
  // replace the current main by the new one, only if loaded
  loaded && replace(element, one('main'));
  // release the current process
  next(); 
});

// middleware to treat an element with a 'modal' class
anticore.on('.modal', function(element, next) {
  // append the modal to the body
  append(element, one('body'));
  next(); 
});

// middleware to treat an button with a 'closer' class contained in a modal 
anticore.on('.modal button.closer', function(element, next) {
  // listen the click on the button to close the modal
  onClick(element, onClose);
  next(); 
});

// apply the defaults middlewares (to listen anchor/button click and form submit)
// then trigger all the middlewares on the current document 
anticore.defaults().populate();
```

## What's new in the V2?

If the V1 was really lightweight, the V2 isn't, because it comes with a lot of generic utils (proposals are
welcome), useful to easily write your client code, without any unused features and with a better
minification result... but without growing your `dist` package.

You can use the anticore methods or not... or both, if you need some offered functions, these functions are
embed in your `dist`, but never if your don't import it explicitly.

On an other aspect, the V2 is 100% based on `import`/`export`.

## Breaking changes from the V1

The anticore methods are unchanged, but all the utils are rewritten as separated modules.

If you need the previous version, you can install it by `npm i -D anticore@1.9.1`


## anticore methods

[anticore methods](./anticore.md#reference)

## Tools

* [dom](./dom/#reference)
* [global](./global/#reference)
* [primitive](./primitive/#reference)
* [request](./request/#reference)

## License

[MIT](./licence.md)