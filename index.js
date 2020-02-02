import globalFetch from 'anticore-core/apis/fetch/index.js'
import clone from 'anticore-core/apis/Request/clone.js'
import bind from 'anticore-core/Function/bind.js'
import curry from 'anticore-core/Function/curry.js'
import promise from 'anticore-core/Function/promise.js'
import forEach from 'anticore-core/Array/forEach.js'
import map from 'anticore-core/Array/map.js'
import empty from 'anticore-core/Object/empty.js'
import prevent from 'anticore-dom/emitter/prevent.js'
import document from 'anticore-dom/node/document.js'
import element from 'anticore-dom/node/element.js'
import all from 'anticore-dom/query/all.js'
import one from 'anticore-dom/query/one.js'
import append from 'anticore-dom/tree/append.js'
import attr from 'anticore-dom/tree/attr.js'
import fromString from 'anticore-dom/tree/fromString.js'
import error from 'anticore-utils/console/error.js'
import log from 'anticore-utils/console/log.js'
import noop from 'anticore-utils/noop.js'
import pool from 'anticore-utils/pool.js'

const fetching = 'fetching'
const contracts = []
const requests = pool()
const selector = `
:focus,
:hover,
button[type=submit],
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
  const template = append(fragment, attr(element('template'), 'class', 'anticore'))

  return promise(dispatch, matchAll(template.content), url)
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
    notify: curry(notify, find(target, event.type))
  })

  prevent(event)
  requests.push(entry)
  entry.notify('add')
  attempt()
}

function find (target, type) {
  if (type !== 'submit') {
    return target
  }

  return one(selector, target)
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
