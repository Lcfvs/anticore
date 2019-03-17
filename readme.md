# <a name="reference"><img alt="anticore" src="./logo.png" title="BETA anticore" width="200" /></a>

[![npm](https://img.shields.io/npm/v/anticore.svg?style=plastic)]()
[![Downloads](https://img.shields.io/npm/dt/anticore.svg?style=plastic)]()
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

**anticore** is a library to handle your AJAX/SSE DOM contents, using some contracts.

## <a name="install">Install</a>

`npm i anticore`

## <a name="basic-usage">Basic usage</a>

```js
import { trigger } from 'anticore'
// begin of custom contracts

// end of custom contracts
import 'anticore-contracts/fetchers/defaults'
import 'anticore-contracts/main/mono'

trigger()
```

## <a name="apis">APIs</a>

### <a name="on">on(selector, listener)</a>
Useful to declare a contract to be applied for any element matching the selector, where:
* `selector`: a query selector
* `listener`: a function to be applied on the matching elements
  * `element`: the matching element
  * `next`: a function to let the other contracts declared after this one (**must be always called!**) 
  * `url`: the url providing the node (can be empty)

```js
import { on } from 'anticore'

on('body', (element, next, url) => {
  element.innerHTML = `This is the called url: ${url}`
  next()
})
```

### <a name="populate">trigger([node])</a>
Useful to apply the declared contracts on the provided `node`, where:
* **optional** `node`: the targeted node (element or document))

```js
import { trigger } from 'anticore'

trigger(document)
```

### <a name="fetch">fetch(target, request[, interval = 1000[, retries = Infinity]])</a>

Useful to create your own DOM content fetchers, where:
* `event`: the event invoking the `fetch`
* `target`: the element invoking the `fetch` (gets a `.fetching`, until resolved)
* `request`: the [Request](https://developer.mozilla.org/fr/docs/Web/API/Request) instance
* **optional** `options`: the options object
    * **optional** `interval`: the delay before a retry, if the fetch fails
    * **optional** `retries`: the number of possible retries

```js
import { fetch } from 'anticore'

fetch(event, element, request, options)
```

## <a name="sse">sse(url, [options, [reviver]])</a>

Useful to listen Server-Sent Events
```js
import sse from 'anticore/sse'

const eventSource = sse(url, options, reviver)
```


## <a name="companions">Companions</a>

* [anticore-contracts](https://github.com/Lcfvs/anticore-contracts)
* [anticore-core](https://github.com/Lcfvs/anticore-core)
* [anticore-dom](https://github.com/Lcfvs/anticore-dom)
* [anticore-utils](https://github.com/Lcfvs/anticore-utils)


## <a name="license">License</a>

[MIT](https://github.com/Lcfvs/anticore/blob/master/licence.md)
