import { listen, on, parse, trigger } from '../../anticore.js'
import { all, one } from '../../utils/select.js'

const replace = element => {
  const { name, nodeName, property } = element
  const tag = nodeName.toLowerCase()
  const selector = tag !== 'meta'
    ? tag
    : `${tag}[${name ? 'name' : 'property'}="${name || property}"]`

  one(selector).replaceWith(element)
}

on('.anticore main', (main, url) => {
  const root = main.getRootNode()
  const title = one('title', root)
  const metas = all('meta[name], meta[property]', root)
  const elements = [...metas, title, main]

  if (!main.classList.contains('error')) {
    globalThis.history.pushState(root.innerHTML, title.innerHTML, url)
  }

  if (!globalThis.location.hash) {
    globalThis.scrollTo(0, 0)
  }

  if (title.matches('.anticore > title')) {
    elements.forEach(replace)
  }
})

listen('popstate', globalThis, ({ state }) =>
  trigger(parse(state, document.location.href)))

