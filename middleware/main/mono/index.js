import {anticore} from '../../../index'
import {global} from '../../../global'
import {all} from '../../../dom/query/all'
import {closest} from '../../../dom/query/closest'
import {one} from '../../../dom/query/one'
import {replace} from '../../../dom/tree/replace'
import {text} from '../../../dom/tree/text'
import {every} from '../../../primitive/array/every'
import {curry} from '../../../primitive/function/curry'
import {create} from '../../../primitive/object/create'

const window = global()
const history = create()
history.entries = create()

function cleanHref (href) {
  return href.toString().split('#')[0]
}

function getTitle (element) {
  return text(one('h1', element)).trim()
}

function updateTitle (element) {
  const title = history.branding.replace('$1', getTitle(element))

  window.document.title = title

  return title
}

function listen () {
  const main = one('main')

  register(main, cleanHref(window.location.href))
  window.addEventListener('popstate', onPopState)
  history.branding = window.document.title.trim()
    .replace(getTitle(main), '$1')
}

function onPopState (event) {
  const registered = history.entries[cleanHref(event.target.location.href)]
  const current = one('main')

  if (registered && registered !== current) {
    updateTitle(registered)
    replace(registered, current)
  }
}

function register (element, url) {
  if (url) {
    history.entries[url] = element
  }
}

function tagCurrent (url, current, candidate) {
  if (cleanHref(candidate.href) === url) {
    current.classList.remove('current')
    candidate.classList.add('current')

    return false
  }

  return true
}

anticore.on('main', function (element, next, loaded, url) {
  if (loaded && one('h1', element)) {
    register(element, url)
    window.history.pushState(null, updateTitle(element), url)
    replace(element, one('main'))
  }

  const current = url && one('body nav a.current')
  const anchors = current && all('a', closest('ol, ul', current))

  if (anchors) {
    every(anchors, curry(tagCurrent, cleanHref(url), current))
  }

  next()
})

listen()
