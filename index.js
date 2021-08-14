const policies = new WeakMap()

const noop = () => {}

const policy = {
  createHTML: source => source
}

export const config = {
  anchor: `
a[href^="http"]:not([download]):not([target]),
a[href^="."]:not([download]):not([target]),
a[href^="/"]:not([download]):not([target])
`,
  form: `
form:not([target])
`,
  focused: `
:focus,
:hover,
button[type=submit],
button:not([type])`,
  className: 'fetching',
  credentials: 'same-origin',
  interval: 1000,
  redirect: 'follow',
  retries: Infinity,
  onContract: noop,
  onError: console.error.bind(console)
}

const defaultPicker = fn => fn

export const {
  defaults,
  fetch,
  listen,
  on,
  sse,
  trigger,
  when
} = anticore({
  window: typeof globalThis !== 'undefined' && globalThis
})

const fetcher = {
  event: null,
  target: null,
  request: null,
  session: null,
  retries: null,
  async fetch () {
    const { request, session } = this
    const { window } = session
    let body

    try {
      const response = await window.fetch(request.clone())
      const { url = request.url } = response
      const data = await response.text()

      body = fromString(data, url)
      await this.trigger(body, url)
    } catch (error) {
      const { interval, retries = session.retries } = this

      if (!body && retries) {
        this.retries -= 1
        console.log(`Retrying in ${interval / 1000}s`)
        await sleep(interval)
        await this.fetch()
      } else {
        return Promise.reject(error)
      }
    }
  },
  async trigger (node, url) {
    const matches = []

    this.session.contracts.forEach(({ selector, listener }) => {
      matches.push(...[...node.querySelectorAll(selector)]
        .map(current => url => listener(current, url)))
    })

    return Promise.all(matches.map(triggerMatch, { url }))
  }
}

const events = {}

events.blur = ['blur', 'touchcancel', 'touchleave']
events.blur.listener = function (listener, event) {
  return listener.call(this, event)
}

events.click = ['click', 'touchend']
events.click.listener = function (listener, event) {
  if (!event.touches || event.touches.length === 1) {
    return listener.call(this, event)
  }
}

events.focus = ['focus', 'touchstart']
events.focus.listener = events.blur.listener

function html (contents, factory) {
  if (factory && factory.createPolicy && !policies.has(factory)) {
    policies.set(factory, factory.createPolicy('anticore', policy))
  }

  return (policies.get(factory) || policy).createHTML(contents)
}

function fromString (data, url) {
  const body = globalThis.document.createElement('body')
  body.classList.add('anticore')
  body.id = url
  body.innerHTML = html(data, globalThis.trustedTypes)

  return body
}

function sleep (interval) {
  return new Promise(resolve => setTimeout(resolve, interval))
}

function apply (method, event, target, listener, options) {
  const names = events[event] || [event]
  const { length } = names

  for (let key = 0; key < length; key += 1) {
    const name = names[key]

    if (`on${name}` in target) {
      target[method](name, listener, options)
    }
  }
}

async function triggerMatch (match) {
  const { url } = this

  await match(url)
}

function request (session, target) {
  const { window } = session
  const { Request } = window
  const { init, url } = build(session, target)

  return new Request(url, init)
}

function build (session, target) {
  const { credentials, redirect, window } = session
  const { FormData, Headers, URL, URLSearchParams } = window
  const { action, elements, href } = target
  const method = (target.method || 'GET').toUpperCase()
  const hasBody = !['GET', 'HEAD'].includes(method)
  const url = new URL(action || href || target.ownerDocument.location.href)

  if (elements && !hasBody) {
    const searches = [url.search, new FormData(target)].filter(length)

    url.search = new URLSearchParams(searches.join('&')).toString()
  }

  return {
    init: {
      ...hasBody && {
        body: new FormData(target)
      },
      credentials,
      headers: new Headers({
        'X-Requested-With': 'XMLHttpRequest'
      }),
      method,
      redirect
    },
    url: url.toString()
  }
}

function length (params) {
  return params.toString().length
}

export default function anticore ({
  anchor = config.anchor,
  className = config.className,
  credentials = config.credentials,
  focused = config.focused,
  form = config.form,
  interval = config.interval,
  onContract = config.onContract,
  onError = config.onError,
  redirect = config.redirect,
  retries = config.retries,
  window
}) {
  const session = {
    className,
    credentials,
    interval,
    onContract,
    onError,
    redirect,
    retries,
    window,
    contracts: [],
    promise: Promise.resolve(),
    url: window.location.href
  }

  const handler = {
    defaults () {
      handler.on(anchor, element => {
        handler.listen('click', element, event => {
          return handler.fetch(request(session, element), event, element)
            .catch(onError)
        })
      })

      handler.on(form, element => {
        handler.listen('submit', element, event => {
          element.querySelectorAll('.error').forEach(error => error.remove())

          return handler.fetch(request(session, element), event, element)
            .catch(onError)
        })
      })
    },
    async fetch (request, event, target = event && event.target) {
      const fetchable = {
        ...fetcher,
        event,
        request,
        target,
        session
      }

      if (!event) {
        return fetchable.fetch()
      }

      if (event.defaultPrevented || event.cancelBubble) {
        return
      }

      const emitter = event.type === 'submit'
        ? target.querySelector(focused)
        : target

      event.preventDefault()

      session.promise = session.promise.then(async () => {
        emitter.classList.add(className)
        await fetchable.fetch()
        emitter.classList.remove(className)
      })

      return session.promise
    },
    listen (event, target, listener, options = {}) {
      const names = events[event]
      const cb = Array.isArray(names)
        ? names.listener.bind(target, listener)
        : listener

      apply('addEventListener', event, target, cb, options)

      return () => apply('removeEventListener', event, target, cb, options)
    },
    on (selector, listener) {
      session.contracts.push({ listener, selector })
      session.onContract(selector, listener)
    },
    when (selector, { url }, path, picker = defaultPicker) {
      const resolved = `${new URL(path, url)}`

      return handler.on(selector, async (element, url) => {
        const exports = await import(resolved)

        return picker(exports.default, exports)(element, url)
      })
    },
    sse (url, config, reviver = fromString) {
      const source = new window.EventSource(url, config)

      source.addEventListener('message', event => {
        handler.trigger(reviver(event.data, url), url)
      })

      source.addEventListener('error', onError)

      return source
    },
    trigger (
      node = session.window.document,
      url = session.window.document.location.href
    ) {
      return { ...fetcher, session }.trigger(node, url)
        .catch(onError)
    }
  }

  return handler
}
