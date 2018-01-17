/*
 Copyright MIT 2017 Lcf.vs
 https://github.com/Lcfvs/anticore
 */
void function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(factory.bind(null, global));
  } else if (typeof module === "object" && module.exports) {
    module.exports = factory(global);
  } else {
    global.anticore = factory(global);
  }
}(Function('return this;')(), function (global) {
  'use strict';

  var
  focusSelector,
  selector,
  targetSelector,
  document,
  encodeURIComponent,
  URL,
  fetch,
  FormData,
  demethodize,
  forEach,
  anticore,
  registry,
  requestPrototype,
  queue,
  types;

  focusSelector = 'input[type=submit]:hover,'
  + 'button[type=submit]:hover,'
  + 'button:not([type]):hover,';

  selector = focusSelector
  + 'input[name]:not([type=file]):not([type=reset]):not([type=submit]):not([type=checkbox]):not([type=radio]):not(:disabled),'
  + 'input[name][type=checkbox]:checked:not(:disabled),'
  + 'input[name][type=radio]:checked:not(:disabled),'
  + 'textarea[name]:not(:disabled),'
  + 'select[name]:not(:disabled) [selected=selected]';

  targetSelector = focusSelector
  + ':not(input):hover,'
  + 'input[type=submit],'
  + 'button[type=submit],'
  + 'button:not([type])';

  document = global.document;
  encodeURIComponent = global.encodeURIComponent;
  URL = global.URL;
  fetch = global.fetch;
  FormData = global.FormData;
  demethodize = Function.bind.bind(Function.call);
  forEach = demethodize([].forEach);
  types = ['html', 'svg', 'xml'];

  function create(prototype, descriptors) {
    return Object.create(prototype || null, descriptors);
  }

  function $(selector, refNode) {
    refNode = (refNode || document);

    return selector === undefined ? refNode : refNode.querySelector(selector);
  }

  function $$(selector, refNode) {
    return (refNode || document).querySelectorAll(selector);
  }

  function html(data) {
    var
    body = document.createElement('body');

    body.innerHTML = data;

    return body;
  }

  anticore = create();
  anticore.fetchers = create();
  registry = create();
  requestPrototype = create();
  queue = [];

  /**
   * Builds a request based on a form
   * @param {HTMLFormElement} form
   * @returns {Object} request
   */
  anticore.fetchers.form = function (form) {
    var
    action = new URL(form.action || form.ownerDocument.location.href),
    method = form.method,
    data;

    if (method === 'post') {
      data = new FormData(form);
    } else {
      action.search += action.search.indexOf('?') > -1 ? '' : '?';
      forEach($$(selector, form), stringify, action);
    }

    return anticore.request(action, method, data, form);
  };

  function stringify(item) {
    if (!item.offsetWidth && !item.offsetHeight && !item.getClientRects().length) {
      return;
    }

    this.search += '&' + encodeURIComponent((item.nodeName.toLowerCase() === 'option'
    ? item.parentNode
    : item).name) + '=' + encodeURIComponent(item.value).replace(/%20/g, '+');
  }

  /**
   * Builds a request based on an anchor
   * @param {HTMLAnchorElement} a
   * @returns {object} request
   */
  anticore.fetchers.a = function (a) {
    return anticore.request(a.href, 'get', null, a);
  };

  /**
   * Builds a request based on an element
   * (form or anchor, for more, extend anticore fetchers)
   * @param {HTMLElement} element
   * @returns {Object} request
   */
  anticore.fetcher = function (element) {
    var
    name = element.nodeName.toLowerCase();

    return anticore.fetchers[name](element);
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
   * @param {Function} listener
   * @returns {Object} anticore
   */
  anticore.on = function (selector, listener) {
    registry[selector] = registry[selector] || [];

    if (registry[selector].indexOf(listener) < 0) {
      registry[selector].push(listener);
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
    return populate(container || document);
  };

  /**
   * Builds a request
   * @param {String} url
   * @param {String} method (get or post)
   * @param {Object} [body] (the post request body)
   * @param {Element} [target] (the event target)
   * @return {requestPrototype}
   */
  anticore.request = function (url, method, body, target) {
    var
    request,
    options;

    request = create(requestPrototype);
    options = create();

    request.options = options;
    request.target = target;

    if (target) {
      request.originalTarget = target.ownerDocument.querySelector(targetSelector);
    }

    request.url = url;

    options.headers = create();
    options.headers['X-Requested-With'] = 'XMLHttpRequest';
    options.method = method;
    options.body = body;

    return request;
  };

  /**
   * Default fetcher listener
   * @param {Event} event
   */
  anticore.fetchFromEvent = function (event) {
    event.preventDefault();

    anticore
    .fetcher(event.target)
    .fetch(anticore.trigger)
    ['catch'](anticore.onError);

    return false;
  };

  anticore.onError = console.error.bind(console);

  anticore.plugins = create();
  anticore.utils = create();
  anticore.utils.create = create;
  anticore.utils.demethodize = demethodize;
  anticore.utils.forEach = forEach;
  anticore.utils.$ = $;
  anticore.utils.$$ = $$;

  /**
   * Adds default a:not([download]):not([target]):not([href^="data:"]),a[target=_self]:not([download]):not([href^="data:"]) & form middlewares
   * @returns {Object} anticore
   */
  anticore.defaults = function () {
    anticore.on('a:not([download]):not([target]):not([href^="data:"]),a[target=_self]:not([download]):not([href^="data:"])',
    function(element, next) {
      anticore.utils.listen('click', element, anticore.fetchFromEvent);

      next();
    });

    anticore.on('form:not([target]),form[target=_self]', function(element, next) {
      element.addEventListener('submit', cleanAndFetch);
      next();
    });

    return anticore;
  };

  void function () {
    var
    events = create(),
    prototype = Element.prototype,
    listen = prototype.addEventListener,
    forget = prototype.removeEventListener;

    events.blur = ['blur', 'touchcancel', 'touchleave'];
    events.blur.listener = function (listener, event) {
      return listener.call(this, event);
    };

    events.click = ['click', 'touchend'];
    events.click.listener = function (listener, event) {
      if (!event.touches || event.touches.length === 1) {
        return listener.call(this, event);
      }
    };

    events.focus = ['focus', 'touchstart'];
    events.focus.listener = events.blur.listener;

    function call(method, event, element, listener, useCapture) {
      if ('on'.concat(event) in element) {
        method.call(element, event, listener, useCapture);
      }
    }

    function callEach(method, event, element, listener, useCapture) {
      var
      realListener = listener,
      names,
      key = 0,
      length;

      if (event in events) {
        names = events[event];
        length = names.length;

        if (method === listen) {
          realListener = names.listener.bind(element, realListener);
        }

        for (key; key < length; key += 1) {
          call(method, names[key], element, realListener, useCapture);
        }

        return realListener;
      }

      call(method, event, element, realListener, useCapture);

      return realListener;
    }

    /**
     * Listens an event on an element (touch or not)
     * @param {String} event
     * @param {Element} element
     * @param {Function} listener
     * @param {Boolean} useCapture
     * @returns {Function} realListener
     */
    anticore.utils.listen = callEach.bind(null, listen);

    /**
     * Forgets a listener of an event on an element (touch or not)
     * @param {String} event
     * @param {Element} element
     * @param {Function} listener
     * @param {Boolean} useCapture
     * @returns {Function} listener
     */
    anticore.utils.forget = callEach.bind(null, forget);

    /**
     * Listens once an event on an element (touch or not)
     * @param {String} event
     * @param {Element} element
     * @param {Function} listener
     * @param {Boolean} useCapture
     * @returns {Function} listener
     */
    anticore.utils.once = function (event, element, listener, useCapture) {
      var realListener = anticore.utils.listen(event, element, function (event) {
        anticore.utils.forget(event.type, element, realListener, useCapture);

        return listener.call(this, event);
      }, useCapture);

      return realListener;
    };
  }();

  /**
   * Listens an click or unique touch event on an element
   * @deprecated use anticore.utils.listen instead
   * @param {Element} element
   * @param {Function} listener
   * @param {Boolean} useCapture
   * @returns {Function} listener
   */
  anticore.utils.listenClickOrTap = function (element, listener, useCapture) {
    console.warn('Deprecated: use anticore.utils.listen instead');

    return anticore.utils.listen(element, 'click', listener, useCapture);
  };

  function notify(response) {
    var
    target = queue[0].request.originalTarget;

    if (target) {
      target.classList.toggle('fetching');
    }

    return response;
  }

  /**
   * Adds a field value on an existing body
   * @param {String} name
   * @param {*} value
   * @return {requestPrototype}
   */
  requestPrototype.body = function (name, value) {
    this.options.body.append(name, value);

    return this;
  };

  /**
   * Adds credentials to the request
   * (let by default, if you fetch a resource on the same domain, if not, use 'include')
   * @param {String} [value='same-origin']
   * @return {requestPrototype}
   */
  requestPrototype.credentials = function (value) {
    this.options.credentials = value || 'same-origin';

    return this;
  };

  /**
   * Fetches the request & adds a trigger callback for the response
   * @param {Function} trigger
   * @returns {Promise}
   */
  requestPrototype.fetch = function (trigger) {
    var
    item = create();

    item.request = this;
    queue.push(item);

    return new Promise(function (resolve, reject) {
      item.request.resolve = resolve;
      item.reject = reject;
      item.trigger = trigger;
      fetchRequest();
    });
  };

  /**
   * Retries to fetch a request
   * @returns {requestPrototype}
   */
  requestPrototype.retry = function () {
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
   * @returns {requestPrototype}
   */
  requestPrototype.header = function (name, value) {
    this.options.headers[name] = value;

    return this;
  };

  /**
   * Adds an option to the request
   * @param {String} name
   * @param {String} value
   * @returns {requestPrototype}
   */
  requestPrototype.option = function (name, value) {
    this.options[name] = value;

    return this;
  };

  function nextRequest() {
    queue.shift();

    if (queue.length) {
      fetchRequest();
    }
  }

  function fetchRequest() {
    var
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
    .then(nextRequest)
    .catch(item.reject);
  }

  function onResponse(response) {
    var
    type= ((response.headers.get('content-type') || 'application/octet-stream')
    .match(/json|html|svg|xml|text(?=\/plain)/) || ['blob'])[0],
    item = queue[0];

    item.type = type;
    item.request.response = response;

    return response[types.indexOf(type) > -1 ? 'text' : type]();
  }

  function onFragment(data) {
    var
    item = queue[0];

    if (types.indexOf(item.type) > -1) {
      item.request.response.result = html(data);
    } else {
      item.request.response.result = data;
    }

    return item.request;
  }

  function nextRecord(resolve) {
    var
    record = this.shift();

    if (!record) {
      return resolve && resolve();
    }

    record[0](record[1], this.next, this.loaded);
  }

  function onSelector(selector) {
    var
    queue = this,
    nodes = $$(selector, queue.container);

    queue.selector = selector;
    forEach(nodes, onElement, queue);
  }

  function onElement(element) {
    var
    queue = this;

    queue.element = element;

    forEach(registry[queue.selector], onListener, queue);
  }

  function onListener(listener) {
    this.push([listener, this.element, this.loaded]);
  }

  function populate(container, loaded) {
    return new Promise(function (resolve) {
      var
      queue = [];

      queue.container = container;
      queue.loaded = loaded;
      forEach(Object.keys(registry), onSelector, queue);
      queue.next = nextRecord.bind(queue, resolve);
      queue.next();
    });
  }

  function cleanAndFetch(event) {
    forEach($$('.error', event.target), clean);
    anticore.fetchFromEvent(event);
  }

  function clean(element) {
    element.parentNode.removeChild(element);
  }

  return anticore;
});