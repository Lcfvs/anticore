import {anticore} from '../../../index'
import {one} from '../../../dom/query/one'
import {replace} from '../../../dom/tree/replace'
import {text} from '../../../dom/tree/text'
import {global} from '../../../global'
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

anticore.on('main', function (element, next, loaded, url) {
  if (loaded) {
    register(element, url)
    window.history.pushState(null, updateTitle(element), url)
    replace(element, one('main'))
  }

  next()
})

listen()
