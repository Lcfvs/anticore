/*
 Copyright MIT 2016 Lcf.vs
 https://github.com/Lcfvs/form.cheats
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
        queue;

    document = global.document;
    range = document.createRange();
    fetch = global.fetch;
    FormData = global.FormData;
    demethodize = Function.bind.bind(Function.call);
    forEach = demethodize([].forEach);
    html = demethodize(range.createContextualFragment, range);
    log = demethodize(console.log, console);

    create = function (prototype) {
        return Object.create(prototype || null);
    };

    anticore = global.anticore = create();
    anticore.fetchers = create();
    registry = create();
    requestPrototype = create();
    queue = [];

    anticore.fetchers.form = function (form) {
        return anticore.request(form.action, form.method, new FormData(form));
    };

    anticore.fetchers.a = function (a) {
        return anticore.request(a.href, 'get');
    };

    anticore.fetcher = function (element) {
        var name;

        name = element.nodeName.toLowerCase();

        return anticore.fetchers[name](element);
    };

    anticore.trigger = function (request) {
        anticore.onTimeout(request);
        setTimeout(anticore.populate, 0, request.response.fragment, true);
    };

    anticore.on = function (selector, listener) {
        registry[selector] = registry[selector] || [];

        if (registry[selector].indexOf(listener) < 0) {
            registry[selector].push(listener);
        }

        return anticore;
    };

    anticore.onTimeout = function (request) {
        if (request.response.status === 408) {
            request.retry();

            throw new Error();
        }
    };

    anticore.populate = function (container, loaded) {
        var queue;

        queue = [];
        queue.container = container;
        queue.loaded = loaded === true;
        forEach(Object.keys(registry), onSelector, queue);
        queue.next = nextRecord.bind(queue);
        queue.next();
    };

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

    requestPrototype.body = function (name, value) {
        this.options.body.append(name, value);

        return this;
    };

    requestPrototype.credentials = function (value) {
        if (value === undefined) {
            value = 'same-origin';
        }

        this.options.credentials = value;

        return this;
    };

    requestPrototype.fetch = function (trigger) {
        var item;

        item = create();
        item.request = this;
        item.trigger = trigger;

        queue.push(item);
        fetchRequest();
    };

    requestPrototype.retry = function () {
        if (!queue[0] || queue[0].request !== this) {
            return;
        }

        queue.unshift(1);
        queue.next();
    };

    requestPrototype.header = function (name, value) {
        this.options.headers[name] = value;

        return this;
    };

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
            .then(html)
            .then(onFragment)
            .then(item.trigger)
            .then(nextRequest)
            .catch(log);
    }

    function onResponse(response) {
        var item;

        item = queue[0];
        item.request.response = response;

        return response.text();
    }

    function onFragment(fragment) {
        var item;

        item = queue[0];
        item.request.response.fragment = fragment;

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