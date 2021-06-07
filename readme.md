# <a name="reference"><img alt="anticore" src="./logo.png" title="anticore" width="200" /></a>

A library to handle your AJAX/SSE DOM contents and to automate your requests, using some contracts.

[![npm](https://img.shields.io/npm/v/anticore.svg?style=plastic)]()
[![Downloads](https://img.shields.io/npm/dt/anticore.svg?style=plastic)]()
[![Language grade: JavaScript](https://img.shields.io/lgtm/grade/javascript/g/Lcfvs/anticore.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Lcfvs/anticore/context:javascript)
[![Total alerts](https://img.shields.io/lgtm/alerts/g/Lcfvs/anticore.svg?logo=lgtm&logoWidth=18)](https://lgtm.com/projects/g/Lcfvs/anticore/alerts/)
[![anticore](https://img.shields.io/endpoint?url=https://dashboard.cypress.io/badge/detailed/a8gm9m&style=flat&logo=cypress)](https://dashboard.cypress.io/projects/a8gm9m/runs)

## <a name="demos">Demos</a>

Since it really often helps to understand the concept, you can try it yourself in a few seconds:
  * Go to the [Live demo](https://anticore.io), using another tab/window
  * Replace the content of the **Your contracts** by
```js
on('main.a', element => {
  element.querySelector('h1').append('should be a: ', element.className)
})

on('main.b', element => {
  element.querySelector('h1').append('should be b: ', element.className)
})

on('main.c', element => {
  element.querySelector('h1').append('should be c: ', element.className)
})

on('main', element => {
  element.querySelector('h1').append(' AND can be one of a || b || c || my-own: ', element.className)
})

// a very basic view switcher
on('.anticore > main', element => {
  const main = document.querySelector('main')

  main.replaceWith(element)
})
```
  * Press the **"play"** button on its right
  * Go to the **Server responses**
  * Click on the **"plus"** button, type `a` into the prompt & press **Enter**
  * Click on the **"plus"** button, type `b` into the prompt & press **Enter**
  * Click on the **"plus"** button, type `c` into the prompt & press **Enter**
  * Finally, send them by clicking the **"play"** button on its right, in any order and check how it changes the **Preview**, and the **Current tree**.

Alternatively, you can also try this other demo, which includes an SSE example:

[anticore-starter](https://glitch.com/edit/#!/anticore-starter?path=README.md%3A1%3A0) (also installable from [./demo](./demo))


## <a name="key-features">Key features</a>

* **Content based**, anticore is a utility used to easily interact with any
  [DOM](https://developer.mozilla.org/en-US/docs/Glossary/DOM) server-side rendered (SSR) element, even received in AJAX or SSE.
  Of course, it also supports the `ServiceWorker` rendered elements to **work offline**.

* **Contracts oriented**, just like an event listener, you can write some contracts to define some process on any element
  matching a selector when anticore receives it, regardless of how many (various) views needs them.

* **Automated on demand**, by a single function call, during the script initialization, **it avoids the need to write any
  AJAX request**, they are automatically deduced by the anchor/form attributes, on the user interaction related event (`click`/`submit`).

* **Very low front-end**, weighing only **4Ko minified** without dependency, it provides a strategy to incite you to keep
  your front code lightest as possible, letting your rendering strategy, and the control to the server side.

  The front code is only used as an [unobstrusive](https://en.wikipedia.org/wiki/Unobtrusive_JavaScript) overlay to
  improve the user experience and let the client resources available for any other operations.

* **Reusable**, through projects, you have a lot of as **generic contracts** to cover most of your needs **at once**...
  you can also write any project-specific contracts if needed, just based on the selector precision.

* **Server-side/framework agnostic**, no specific server configuration needed, just to receive some DOM contents
  (HTML, SVG, ...). It can be used in conjunction to your favorite libraries & frameworks.

* **Easy to maintain**, it doesn't chain all the process, each contract, ideally following the
  [single responsibility principle](https://en.wikipedia.org/wiki/Single_responsibility_principle), is simply
  replaceable/removable without the need to check the entire project.

* **TrustedTypes** support for your own [trusted contents](https://developer.mozilla.org/en-US/docs/Web/API/Trusted_Types_API).


## <a name="install">Install</a>

Using NPM:
`npm i anticore`

Or using a CDN:
```js
import anticore, { defaults, on, trigger } from 'https://unpkg.com/anticore@latest/index.js'
```


## <a name="contract-anatomy">Contract anatomy</a>

A contract is just a query selector associated function, a few like a routing route, where the selector is tested **each time anticore receives a new content**.

By default, once triggered, anticore triggers the contracts on any element matching a provided selector, event if that
element is already in the document or received after.

```js
import { on } from 'anticore'

// a contract example
on('a.query.selector', (matchingElement, serverResponseURL) => {
  // processes to apply on the element
})
```


## <a name="loaded">Target the AJAX/SSE loaded elements only</a>

anticore loads the contents in a `<body class="anticore">` (created internally), then you can use that class in your selector to target that
elements, specifically.

For example, we don't want to replace an already embedded element by itself.

```js
import { on } from 'anticore'

// selects an element which is only received after the page load
on('.anticore a.query.selector', (matchingElement, serverResponseURL) => {
  // processes to apply on the element
})
```

A useful selector prefix can also be `body:not(.anticore)` to only target the elements initially loaded (non AJAX/SSE).

```js
import { on } from 'anticore'

on('body:not(.anticore) a.query.selector', (matchingElement, serverResponseURL) => {
  // processes to apply on a loaded element
})
```

## <a name="initialization">Initialization</a> (aka `main.js`)

```js
import { defaults, trigger } from 'anticore'
// an import to load all on your contracts
import './contracts.js'

defaults() // register the default contracts, to handle your anchors/forms without target attribute
trigger() // applies the contracts on the current document elements
```

## <a name="a-very-first-contract">A very first contract</a> (aka `view-switcher.js`)

When you create an AJAX navigation, the most common operation is to replace the current contents by the user requested
contents.

To do that, commonly...

* you need to create a lot of functions to build some AJAX (`XMLHttpRequest`/`fetch`) requests
* you need to check if the response is the expected response (e.g. 403, 404, 500, ...)
* you need to write some functions to treat the received contents
* you need to update the user's history

... requiring an abstraction to avoid code repetitions

With anticore, it's really shorter/simpler!

Since the `<main>` & `<title>` are unique in a page, you can easily write that process with a unique contract.

```js
import { on } from 'anticore'

// matching any received <main> / <title>
on('.anticore > main, .anticore title', (element, url) => {
  // creating a selector based on the element node name
  const selector = element.nodeName.toLowerCase()
  // retrieving the same embedded element in the document
  const current = document.querySelector(selector)

  // replacing the embedded element by the new one
  current.replaceWith(element)

  if (selector === 'title') {
    // updating the history
    history.pushState({}, element.innerHTML, url)
  } else {
    window.scrollTo(0, 0)
  }
})
```

[A full implementation](./demo/public/js/view-switcher.js)

_Voilà_, import it in your `main.js` and your AJAX navigation is resolved **for all your pages, at once!**.

**Caution**: to improve the user experience and the performances, it's recommended to import the "switchers" as very last
contracts, in your `main.js`.

```js
import { defaults, trigger } from 'anticore'
// non-switching contracts here
import './contracts.js'
// then the view-switcher
import './view-switcher.js'

defaults()
trigger()
```

Example:

`index.html`
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Initial title</title>
        <script src="/assets/main.js" type="module"></script>
    </head>
    <body>
        <main>
            <h1>Initial title</h1>
            <a href="/response">Load the response</a>
        </main>
    </body>
</html>
```

`response`
```html
<title>Response title</title>
<main>
    <h1>Response title</h1>
</main>
```

Resolves to
```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Response title</title>
        <script src="/assets/main.js" type="module"></script>
    </head>
    <body>
        <main>
            <h1>Response title</h1>
        </main>
    </body>
</html>
```

## <a name="apis">APIs</a>

### <a name="on">on(selector, listener)</a>
Useful to declare a contract to be applied for any element matching the selector, where:
* `selector`: a query selector
* `listener`: a function to be applied on the matching elements
  * `element`: the matching element
  * `url`: the url providing the node (can be empty, e.g. when the nodes are already in the current page)

```js
import { on } from 'anticore'

// An listener can be async
on('body', async (element, url) => {
  element.append(`Hello world from ${url}`)
})
```

### <a name="defaults">defaults()</a>

A function that wraps 2 contracts

#### <a name="a-click-handler">A click handler</a>

A contract that tells to anticore to fetch the `href` of any clicked anchor

It uses the following selector
```css
a[href^="http"]:not([download]):not([target]),
a[href^="."]:not([download]):not([target]),
a[href^="/"]:not([download]):not([target])
```

#### <a name="a-submit-handler">A submit handler</a>

A contract that tells to anticore to fetch the `action` of any submitted form

It uses the following selector
```css
form:not([target])
```

Additionally, before the fetching, it removes the form descendants that have a `error` class, useful to remove the error messages from a previous submission.

### <a name="trigger">trigger([node])</a>
Useful to apply the declared contracts on the provided `node`, where:
* **optional** `node`: the targeted node (element or current document)

```js
import { trigger } from 'anticore'

trigger(document)
```

### <a name="fetch">fetch(request, event = null, target = event?.target)</a>

Useful to create your own DOM content fetchers, where:
* `request`: the [Request](https://developer.mozilla.org/fr/docs/Web/API/Request) instance
* `event`: the event invoking the `fetch`
* `target`: the element invoking the `fetch` (gets a `.fetching`, until resolved)

** If no `event` is provided, anticore just fetches without DOM parsing, no contracts triggering**

```js
import { fetch } from 'anticore'

fetch(request, event, target) // fetches the contents & triggers the contracts on them
fetch(request) // just fetches
```

#### <a name="fetch--why-another-fetch">Why another `fetch()`?</a>

##### <a name="fetch--connection-loss-management">Connection loss management</a>

Once called, anticore attempts to fetch the response until its resolution.

If the user isn't connected, anticore retries after a delay (1 second by default)

##### <a name="fetch--event-handling">Event handling</a>

If provided, anticore manages the `event` like this:
1. It checks if the event behavior is prevented by `Event.preventDefault()` (e.g. from a form validation contract) or if the bubbling is canceled `event.cancelBubble`.
  In that case, anticore just avoids doing anything
2. It prevents the event behavior
3. It adds a `fetching` class on the element that triggers the event
4. It enqueues that request
5. It really fetches the contents
6. It triggers the contracts on them
7. It removes the `fetching` class on the element that triggers the event


## <a name="sse">sse(url, [options, [reviver]])</a>

Useful to listen Server-Sent Events, where
* `url`: the URL to listen
* `options`: the `EventSource` options
* `reviver`: a function to parse the DOM nodes from each message

```js
import { sse } from 'anticore'

const eventSource = sse(url, options, reviver)
```

## <a name="listen">listen(event, target, listener[, options])</a>

Useful to listen events, on any support (touch and/or not)
* `event`: the event type
* `target`: an `EventTarget`
* `listener`: a function called each time the event triggers
* `options`: the `addEventListener` options

It returns a function to remove the listener, without any arguments needed

```js
import { listen } from 'anticore'

const forget = listen(event, target, listener, options)
```

## <a name="notable-changes">Notable changes from V3</a>

The **V4** is now promise-based, the V3 `next()` is removed, if you need to await some async operations, just use an `async` listener.


### <a name="security">Security</a>

If your project is defining a strict Content-Security-Policy (CSP) you can need to add the following header/meta, to trust your DOM contents:

`Content-Security-Policy: require-trusted-types-for 'script'; trusted-types anticore`


## <a name="license">License</a>

[MIT](https://github.com/Lcfvs/anticore/blob/master/licence.md)



## <a name="contributors">Contributors</a>

* [Brettz Zamir](https://github.com/brettz9)

## <a name="sponsors">Sponsors</a>

[![JetBrains](./sponsors/jetbrains-variant-4.png)](https://www.jetbrains.com/?from=anticore)
