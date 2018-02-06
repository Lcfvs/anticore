import {create} from '../primitive/object/create';
import {one} from '../dom/query/one';
import {queue} from './.queue';
import {global} from '../global';

const
window = global(),
fetch = window.fetch,
prototype = create(),
selector = 'input[type=submit]:focus,'
+ 'button[type=submit]:focus,'
+ 'button:not([type]):focus,'
+ 'input[type=submit]:hover,'
+ 'button[type=submit]:hover,'
+ 'button:not([type]):hover,'
+ ':not(input):hover,'
+ 'input[type=submit],'
+ 'button[type=submit],'
+ 'button:not([type])';

/**
 * Adds a field value on an existing body
 * @param {String} name
 * @param {*} value
 * @return {Object}
 */
prototype.body = function (name, value) {
  this.options.body.append(name, value);

  return this;
};

/**
 * Adds credentials to the request
 * (let by default, if you fetch a resource on the same domain, if not, use 'include')
 * @param {String} [value='same-origin']
 * @return {Object}
 */
prototype.credentials = function (value) {
  this.options.credentials = value || 'same-origin';

  return this;
};

/**
 * Fetches the request & adds a trigger callback for the response
 * @param {Function} trigger
 * @returns {Promise}
 */
prototype.fetch = function (trigger) {
  let
  item = create();

  item.request = this;
  queue.push(item);

  return new Promise(function (resolve, reject) {
    item.request.resolve = resolve;
    item.reject = reject;
    item.trigger = trigger;
    item.request.fetchRequest();
  });
};

/**
 * Retries to fetch a request
 * @returns {Object}
 */
prototype.retry = function () {
  if (!queue[0] || queue[0].request !== this) {
    return this;
  }

  queue.unshift(1);
  queue.next();

  return this;
};

/**
 * Add a header to the request
 * @param {String} name
 * @param {String} value
 * @returns {Object}
 */
prototype.header = function (name, value) {
  this.options.headers[name] = value;

  return this;
};

/**
 * Adds an option to the request
 * @param {String} name
 * @param {String} value
 * @returns {Object}
 */
prototype.option = function (name, value) {
  this.options[name] = value;

  return this;
};

prototype.fetchRequest = function () {
  let
  item = queue[0];

  if (queue[1]) {
    return;
  }

  return fetch(item.request.url, item.request.options)
  .then(item.trigger || item.request.resolve)
  .then(queue.next)
  ['catch'](item.reject);
}

/**
 * Builds a request
 * @param {String} url
 * @param {String} method (get or post)
 * @param {Object} [body] (the post request body)
 * @param {Element} [target] (the event target)
 * @return {Object}
 */
export function request(url, method, body, target) {
  let
  request,
  options;

  request = create(prototype);
  options = create();

  request.options = options;

  if (target) {
    request.target = target;
    request.originalTarget = one(selector, target.ownerDocument);
  }

  request.url = url;

  options.headers = create();
  options.headers['X-Requested-With'] = 'XMLHttpRequest';
  options.method = method;

  if (method === 'post') {
    options.body = body;
  }

  return request;
}