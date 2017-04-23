/*
 Copyright MIT 2017 Lcf.vs
 https://github.com/Lcfvs/anticore
 */
void function (global) {
    'use strict';

    var document,
        range,
        fetch,
        FormData,
        demethodize,
        forEach,
        html,
        log,
        create,
        anticore,
        registry,
        requestPrototype,
        queue,
        types;

    document = global.document;
    range = document.createRange();
    fetch = global.fetch;
    FormData = global.FormData;
    demethodize = Function.bind.bind(Function.call);
    forEach = demethodize([].forEach);
    html = demethodize(range.createContextualFragment, range);
    log = demethodize(console.error, console);
    types = ['html', 'svg'];

    create = function (prototype) {
        return Object.create(prototype || null);
    };

    anticore = global.anticore = create();
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
        return anticore.request(form.action, form.method, new FormData(form));
    };

    /**
     * Builds a request based on an anchor
     * @param {HTMLAnchorElement} a
     * @returns {object} request
     */
    anticore.fetchers.a = function (a) {
        return anticore.request(a.href, 'get');
    };

    /**
     * Builds a request based on an element
     * (form or anchor, for more, extend anticore fetchers)
     * @param {HTMLElement} element
     * @returns {Object} request
     */
    anticore.fetcher = function (element) {
        var name;

        name = element.nodeName.toLowerCase();

        return anticore.fetchers[name](element);
    };

    /**
     * Populates the request response
     * @param {Object} request
     * @returns {Object} anticore
     */
    anticore.trigger = function (request) {
        anticore.onTimeout(request);
        setTimeout(anticore.populate, 0, request.response.fragment, true);

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
     * @returns {Object} anticore
     */
    anticore.onTimeout = function (request) {
        if (request.response.status === 408) {
            request.retry();

            throw new Error('Request timeout');
        }

        return anticore;
    };

    /**
     * Launches the selectors tests to find the related listeners
     * @param {Document|HTMLElement|DocumentFragment} container
     * @param {Boolean} [loaded] (internal use)
     * @returns {Object} anticore
     */
    anticore.populate = function (container, loaded) {
        var queue;

        queue = [];
        queue.container = container;
        queue.loaded = loaded === true;
        forEach(Object.keys(registry), onSelector, queue);
        queue.next = nextRecord.bind(queue);
        queue.next();

        return anticore;
    };

    /**
     * Builds a request
     * @param {String} url
     * @param {String} method (get or post)
     * @param {Object} [body] (the post request body)
     * @return {requestPrototype}
     */
    anticore.request = function (url, method, body) {
        var request,
            options;

        request = create(requestPrototype);
        options = create();

        request.options = options;
        request.url = url;

        options.headers = create();
        options.headers['X-Requested-With'] = 'XMLHttpRequest';
        options.method = method;
        options.body = body;

        return request;
    };

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
     * @param {String} [value = 'same-origin']
     * @return {requestPrototype}
     */
    requestPrototype.credentials = function (value) {
        if (value === undefined) {
            value = 'same-origin';
        }

        this.options.credentials = value;

        return this;
    };

    /**
     * Fetches the request & adds a trigger callback for the response
     * @param {Function} trigger
     * @returns {requestPrototype}
     */
    requestPrototype.fetch = function (trigger) {
        var item;

        item = create();
        item.request = this;
        item.trigger = trigger;

        queue.push(item);
        fetchRequest();

        return this;
    };

    /**
     * Retries to fetch a request
     * @returns {requestPrototype}
     */
    requestPrototype.retry = function () {
        if (!queue[0] || queue[0].request !== this) {
            return;
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
        var item;

        if (queue[1]) {
            return;
        }

        item = queue[0];

        return fetch(item.request.url, item.request.options)
            .then(onResponse)
            .then(onFragment)
            .then(item.trigger)
            .then(nextRequest)
            .catch(log);
    }

    function onResponse(response) {
        var type,
            item;

        type = ((response.headers.get('content-type') || 'html')
            .match(/json|html|svg|text(?=\/plain)/) || ['blob'])[0];

        item = queue[0];
        item.type = type;
        item.request.response = response;

        return response[types.indexOf(type) > -1 ? 'text' : type]();
    }

    function onFragment(data) {
        var item;

        item = queue[0];

        if (types.indexOf(item.type) > -1) {
            item.request.response.fragment = html(data);
        }

        return item.request;
    }

    function nextRecord() {
        var record;

        record = this.shift();

        if (!record) {
            return;
        }

        record[0](record[1], this.next, this.loaded);
    }

    function onSelector(selector) {
        var queue,
            nodes;

        queue = this;
        queue.selector = selector;
        nodes = queue.container.querySelectorAll(selector);
        forEach(nodes, onElement, queue);
    }

    function onElement(element) {
        var queue;

        queue = this;
        queue.element = element;

        forEach(registry[queue.selector], onListener, queue);
    }

    function onListener(listener) {
        this.push([listener, this.element, this.loaded]);
    }
}(this);