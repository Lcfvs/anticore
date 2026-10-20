
const policies = new WeakMap()

const once = true

const passive = true

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
  onError: console.error
}

const defaultPicker = fn => fn

export const {
  defaults,
  fetch,
  listen,
  on,
  parse,
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

      body = parse(data, url)
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

    for (const { selector, listener } of this.session.contracts) {
      matches.push(...[...node.querySelectorAll(selector)]
        .map(current => url => listener(current, url)))
    }

    for (const match of matches) {
      await match(url)
    }
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

function request (session, target, event) {
  const { window } = session
  const { Request } = window
  const { init, url } = build(session, target, event)

  return new Request(url, init)
}

function extract (submitter) {
  const { formAction, formMethod, name, value } = submitter

  return submitter.hasAttribute
    ? {
      formAction: submitter.hasAttribute('formaction') && formAction,
      formMethod: submitter.hasAttribute('formMethod') && formMethod,
      name,
      value
    }
    : { name, value }
}

function resolve (target, submitter) {
  const { action, elements, href, method, ownerDocument } = target
  const { formAction, formMethod, name, value } = extract(submitter || {})

  return {
    action: formAction || action || href || location.href,
    elements,
    method: (formMethod || method || 'GET').toUpperCase(),
    name,
    value
  }
}

function build (session, target, event) {
  const resolved = resolve(target, event.submitter)
  const { credentials, redirect, window } = session
  const { FormData, Headers, URL, URLSearchParams } = window
  const { action, elements, method, name, value } = resolved
  const hasBody = !['GET', 'HEAD'].includes(method)
  const url = new URL(action)
  let body

  if (hasBody) {
    body = new FormData(target)

    if (name) {
      body.append(name, value)
    }
  } else {
    let { searchParams } = url

    if (elements) {
      searchParams = new URLSearchParams([
        ...searchParams,
        ...new FormData(target)
      ])
    }

    if (name) {
      searchParams.append(name, value)
    }

    url.search = searchParams
  }

  return {
    init: {
      body,
      credentials,
      headers: new Headers({
        'X-Requested-With': 'XMLHttpRequest'
      }),
      method,
      redirect
    },
    url: `${url}`
  }
}

function length (params) {
  return params.toString().length
}

function submitter (focused, target, submitter) {
  return submitter || target.querySelector(focused)
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
          return handler.fetch(event, element)
            .catch(onError)
        })
      })

      handler.on(form, element => {
        handler.listen('submit', element, event => {
          element.querySelectorAll('.error').forEach(error => error.remove())

          return handler.fetch(event, element)
            .catch(onError)
        })
      })
    },
    async fetch (event, target = event && event.target) {
      const fetchable = {
        ...fetcher,
        event,
        request: request(session, target, event),
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
        ? submitter(focused, target, event.submitter)
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
    parse (data, url) {
      const body = globalThis.document.createElement('body')
      body.classList.add('anticore')
      body.id = url
      body.innerHTML = html(data, globalThis.trustedTypes)

      return body
    },
    when (selector, { url }, path, picker = defaultPicker) {
      const resolved = `${new URL(path, url)}`

      return handler.on(selector, async (element, url) => {
        const exports = await import(`${resolved}`)

        return picker(exports.default, exports)(element, url)
      })
    },
    sse (url, config, reviver = parse) {
      const source = new globalThis.EventSource(url, config)
      let unloaded = false

      listen('beforeunload', globalThis, () => {
        unloaded = true
      }, { once, passive })

      listen('message', source, event => {
        handler.trigger(reviver(event.data, url), url)
      }, { passive })

      listen('error', source, event => {
        if (!unloaded) {
          onError(event)
        }
      }, { passive })

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
