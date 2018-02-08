/*
 Copyright MIT 2017 Lcf.vs
 https://github.com/Lcfvs/anticore
 */

import {global} from './global';
import {document} from './dom/node/document';
import {all} from './dom/query/all';
import {create} from './primitive/object/create';
import {keys} from './primitive/object/keys';
import {forEach} from './primitive/array/forEach';
import {indexOf} from './primitive/array/indexOf';
import {toDOM} from './primitive/string/toDOM';
import {remove} from './dom/tree/remove';
import {onClick} from './dom/emitter/on/onClick';
import {onSubmit} from './dom/emitter/on/onSubmit';
import {nodeName} from './dom/info/nodeName';
import {parent} from './dom/query/parent';
import {rects} from './dom/info/rects';
import {request} from './request';
import {queue} from './request/.queue';
import {one} from './dom/query/one';

export const anticore = create();

const
window = global(),
encodeURIComponent = window.encodeURIComponent,
fetch = window.fetch,
URL = window.URL,
FormData = window.FormData,
registry = create(),
types = ['html', 'svg', 'xml'],
selector = 'input[type=submit]:focus,'
+ 'button[type=submit]:focus,'
+ 'button:not([type]):focus,'
+ 'input[type=submit]:hover,'
+ 'button[type=submit]:hover,'
+ 'button:not([type]):hover,'
+ 'input[name]:not([type=file]):not([type=reset]):not([type=submit]):not([type=checkbox]):not([type=radio]):not(:disabled),'
+ 'input[name][type=checkbox]:checked:not(:disabled),'
+ 'input[name][type=radio]:checked:not(:disabled),'
+ 'textarea[name]:not(:disabled),'
+ 'select[name]:not(:disabled) [selected=selected]';

anticore.fetchers = create();
anticore.request = request;

/**
 * Builds a request based on an anchor
 * @param {HTMLAnchorElement} a
 * @returns {Object} request
 */
anticore.fetchers.a = function (a) {
  return request(a.href, 'get', null, a);
};

/**
 * Builds a request based on a form
 * @param {HTMLFormElement} form
 * @returns {Object} request
 */
anticore.fetchers.form = function (form) {
  let
  action = new URL(form.action || form.ownerDocument.location.href),
  method = form.method,
  data;

  if (method === 'post') {
    data = new FormData(form);
  } else {
    action.search += indexOf(action.search, '?') > -1 ? '' : '?';
    forEach(all(selector, form), stringify, action);
  }

  return request(action, method, data, form);
};

/**
 * Builds a request based on an element
 * (form or anchor, for more, extend anticore fetchers)
 * @param {HTMLElement} element
 * @returns {Object} request
 */
anticore.fetcher = function (element) {
  return anticore.fetchers[nodeName(element)](element);
};

/**
 * Populates the request response
 * @param {Object} request
 * @returns {Object} anticore
 */
anticore.trigger = function (request) {
  if (anticore.onTimeout(request)) {
    return anticore;
  }

  populate(request.response.result, true)
  .then(request.resolve)
  .then(function () {
    return request;
  });

  return anticore;
};

/**
 * Adds a listener, based on a querySelectorAll
 * @param {String} selector
 * @param {Function} middleware
 * @returns {Object} anticore
 */
anticore.on = function (selector, middleware) {
  registry[selector] = registry[selector] || [];

  if (indexOf(registry[selector], middleware) < 0) {
    registry[selector].push(middleware);
  }

  return anticore;
};

/**
 * Handles any requests timeout & retry if any
 * @param {Object} request
 * @returns {Boolean}
 */
anticore.onTimeout = function (request) {
  if (request.response.status === 408) {
    request.retry();

    return true;
  }

  return false;
};

/**
 * Launches the selectors tests to find the related listeners,
 * takes the scoped document if not passed as argument
 * @param {Document|HTMLElement|DocumentFragment} [container=global.document)
 * @returns {Object} anticore
 */
anticore.populate = function (container) {
  return populate(container || document());
};

/**
 * Default fetcher listener
 * @param {Event} event
 */
anticore.fetchFromEvent = function (event) {
  let
  target = event.target,
  request = anticore.fetcher(target);

  request.target = target;
  request.originalTarget = one(selector, target.ownerDocument);
  request.fetchRequest = fetchRequest;
  event.preventDefault();

  request
  .fetch(anticore.trigger)
  ['catch'](anticore.onError);

  return false;
};

anticore.onError = console.error.bind(console);

/**
 * Adds default a:not([download]):not([target]):not([href^="data:"]),a[target=_self]:not([download]):not([href^="data:"]) & form middlewares
 * @returns {Object} anticore
 */
anticore.defaults = function () {
  anticore.on('a:not([download]):not([target]):not([href^="data:"]),a[target=_self]:not([download]):not([href^="data:"])',
  function(element, next) {
    onClick(element, anticore.fetchFromEvent);
    next();
  });

  anticore.on('form:not([target]),form[target=_self]', function(element, next) {
    onSubmit(element, cleanAndFetch);
    next();
  });

  return anticore;
};

function stringify(item) {
  if (!item.offsetWidth && !item.offsetHeight && !rects(item).length) {
    return;
  }

  this.search += '&' + encodeURIComponent((nodeName(item) === 'option'
  ? parent(item)
  : item).name) + '=' + encodeURIComponent(item.value).replace(/%20/g, '+');
}

function notify(response) {
  let
  target = queue[0].request.originalTarget;

  if (target) {
    target.classList.toggle('fetching');
  }

  return response;
}

function fetchRequest() {
  let
  item = queue[0];

  if (queue[1]) {
    return;
  }

  notify();

  return fetch(item.request.url, item.request.options)
  .then(onResponse)
  .then(notify)
  .then(onFragment)
  .then(item.trigger || item.request.resolve)
  .then(queue.next)
  ['catch'](item.reject);
}

function onResponse(response) {
  let
  type= ((response.headers.get('content-type') || 'application/octet-stream')
  .match(/json|html|svg|xml|text(?=\/plain)/) || ['blob'])[0],
  item = queue[0];

  item.type = type;
  item.request.response = response;

  return response[indexOf(types, type) > -1 ? 'text' : type]();
}

function cleanAndFetch(event) {
  forEach(all('.error', event.target), remove);
  anticore.fetchFromEvent(event);
}

function onFragment(data) {
  let
  item = queue[0];

  if (indexOf(types, item.type) > -1) {
    item.request.response.result = toDOM(data);
  } else {
    item.request.response.result = data;
  }

  return item.request;
}

function nextRecord(resolve) {
  let
  record = this.shift();

  if (!record) {
    return resolve && resolve();
  }

  record[0](record[1], this.next, this.loaded);
}

function onSelector(selector) {
  let
  queue = this,
  nodes = all(selector, queue.container);

  queue.selector = selector;
  forEach(nodes, onElement, queue);
}

function onElement(element) {
  let
  queue = this;

  queue.element = element;
  forEach(registry[queue.selector], onListener, queue);
}

function onListener(listener) {
  this.push([listener, this.element, this.loaded]);
}

function populate(container, loaded) {
  return new Promise(function (resolve) {
    let
    queue = [];

    queue.container = container;
    queue.loaded = loaded;
    forEach(keys(registry), onSelector, queue);
    queue.next = nextRecord.bind(queue, resolve);
    queue.next();
  });
}