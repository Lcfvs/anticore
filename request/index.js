import { one } from '../dom/query/one'
import { global } from '../global'
import { create } from '../primitive/object/create'
import { queue } from './.queue'

const window = global()
const fetch = window.fetch
const XMLHttpRequest = window.XMLHttpRequest
const Response = window.Response
const TypeError = window.TypeError
const prototype = create()
const selector = 'input[type=submit]:focus,' +
  'button[type=submit]:focus,' +
  'button:not([type]):focus,' +
  'input[type=submit]:hover,' +
  'button[type=submit]:hover,' +
  'button:not([type]):hover,' +
  ':not(input):hover,' +
  'input[type=submit],' +
  'button[type=submit],' +
  'button:not([type])'

/**
 * Adds a field value on an existing body
 * @param {String} name
 * @param {*} value
 * @return {Object}
 */
prototype.body = function (name, value) {
  this.options.body.append(name, value)

  return this
}

/**
 * Adds credentials to the request
 * (let by default, if you fetch a resource on the same domain, if not, use 'include')
 * @param {String} [value='same-origin']
 * @return {Object}
 */
prototype.credentials = function (value) {
  this.options.credentials = value || 'same-origin'

  return this
}

/**
 * Fetches the request & adds a trigger callback for the response
 * @param {Function} trigger
 * @returns {Promise}
 */
prototype.fetch = function (trigger) {
  let item = create()

  item.request = this
  queue.push(item)

  return new Promise(function (resolve, reject) {
    item.request.resolve = resolve
    item.trigger = trigger

    item.reject = function (error) {
      reject(error)
      queue.next()
    }

    item.request.fetchRequest()
  })
}

/**
 * Retries to fetch a request
 * @returns {Object}
 */
prototype.retry = function () {
  if (!queue[0] || queue[0].request !== this) {
    return this
  }

  queue.unshift(1)
  queue.next()

  return this
}

/**
 * Add a header to the request
 * @param {String} name
 * @param {String} value
 * @returns {Object}
 */
prototype.header = function (name, value) {
  this.options.headers[name] = value

  return this
}

/**
 * Adds an option to the request
 * @param {String} name
 * @param {String} value
 * @returns {Object}
 */
prototype.option = function (name, value) {
  this.options[name] = value

  return this
}

prototype.fetchRequest = function () {
  let item = queue[0]

  if (queue[1]) {
    return
  }

  const url = item.request.url
  const fetch = item.request.negotiate(url)

  return fetch(url, item.request.options).then(item.trigger ||
    item.request.resolve).then(queue.next)['catch'](item.reject)
}

prototype.negotiate = function (url) {
  return window.location.href.substr(0, 8) === 'file:///' && /^\.|\//.test(url)
    ? fetchFile
    : fetch
}

function fetchFile (url) {
  return new Promise(function (resolve, reject) {
    const xhr = new XMLHttpRequest()

    xhr.addEventListener('load', function () {
      resolve(new Response(xhr.responseText, {
        status: xhr.status
      }))
    })

    xhr.addEventListener('error', function () {
      reject(new TypeError('Local request failed'))
    })

    xhr.open('GET', url)
    xhr.send(null)
  })
}

/**
 * Builds a request
 * @param {String} url
 * @param {String} method (get or post)
 * @param {Object} [body] (the post request body)
 * @param {Element} [target] (the event target)
 * @return {Object}
 */
export function request (url, method, body, target) {
  let request,
    options

  request = create(prototype)
  options = create()

  request.options = options

  if (target) {
    request.target = target
    request.originalTarget = one(selector, target.ownerDocument)
  }

  request.url = url

  options.headers = create()
  options.headers['X-Requested-With'] = 'XMLHttpRequest'
  options.method = method

  if (method === 'post') {
    options.body = body
  }

  return request
}
