import globalFetch from 'anticore-core/apis/fetch/index'
import clone from 'anticore-core/apis/Request/clone'
import bind from 'anticore-core/Function/bind'
import curry from 'anticore-core/Function/curry'
import promise from 'anticore-core/Function/promise'
import forEach from 'anticore-core/Array/forEach'
import map from 'anticore-core/Array/map'
import empty from 'anticore-core/Object/empty'
import prevent from 'anticore-dom/emitter/prevent'
import document from 'anticore-dom/node/document'
import all from 'anticore-dom/query/all'
import one from 'anticore-dom/query/one'
import fromString from 'anticore-dom/tree/fromString'
import error from 'anticore-utils/console/error'
import log from 'anticore-utils/console/log'
import noop from 'anticore-utils/noop'
import pool from 'anticore-utils/pool'

const fetching = 'fetching'
const contracts = []
const requests = pool()
const selector = `
a:focus,
[type=submit]:focus,
button:not([type]):focus,
a:hover,
[type=submit]:hover,
button:not([type]):hover
[type=submit],
button:not([type])`
const defaults = empty({
  interval: 1000,
  retries: Infinity
})

function attempt (current = requests.current() || requests.next()) {
  if (current && !current.pending) {
    current.pending = true

    globalFetch(clone(current.request))
    .then(parse)
    .then(fromString)
    .then(triggerContracts)
    .then(current.notify)
    .then(requests.next)
    .then(attempt)
    .catch(retry)
  }
}

function parse (response) {
  requests.current().response = response

  return response.text()
}

function triggerContracts (fragment) {
  const url = requests.current().response.url

  return promise(dispatch, matchAll(fragment), url)
}

function notify (target, method = 'remove') {
  target.classList[method](fetching)
}

function retry (error) {
  const current = requests.current()

  debug.onError(error)

  if (!current.retries) {
    requests.next()

    return attempt()
  }

  current.pending = false
  current.retries -= 1
  log(`Retrying in ${current.interval / 1000}s`)
  setTimeout(attempt, current.interval)
}

function dispatch (matches, url, callback = noop) {
  const match = matches.next()
  const listener = match.value

  if (match.done) {
    return callback()
  }

  listener(bind(next, empty(), matches, url, callback), url)
}

function next (matches, url, callback) {
  if (!this.called) {
    this.called = true
    dispatch(matches, url, callback)
  }
}

function matchAll (fragment) {
  const elements = []

  forEach(map(contracts, match, fragment), flat, elements)

  return elements.values()
}

function match (contract) {
  return map([...all(contract.selector, this)], prepare, contract)
}

function prepare (element) {
  return curry(this.listener, element)
}

function flat (values) {
  this.push(...values)
}

export function fetch (event, target, request, options) {
  if (event.defaultPrevented || event.cancelBubble) {
    return
  }

  const entry = empty(defaults, options, {
    request,
    notify: curry(notify, one(selector, target.parentNode))
  })

  prevent(event)
  requests.push(entry)
  entry.notify('add')
  attempt()
}

export function on (selector, listener) {
  contracts.push(empty({selector, listener}))
}

export function trigger (node, url) {
  dispatch(matchAll(node || document()), url)
}

export const debug = empty({
  onError: error,
  onMiddleware: noop,
  onMatch: noop
})
