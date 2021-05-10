import { listen, on } from 'https://unpkg.com/anticore@latest/index.js'
import { all, one } from './dom.js'

const history = []

function replace (element) {
  const tag = element.nodeName.toLowerCase()
  const selector = tag !== 'meta'
    ? tag
    : `${tag}[name="${element.name}"]`

  one(selector).replaceWith(element)
}

on('.anticore main', (main, url) => {
  const body = main.closest('body')
  const title = one('title', body)
  const metas = all('meta[name]', body)
  const elements = [main, title, ...metas]

  window.scrollTo(0, 0)

  if (!main.classList.contains('error')) {
    const state = {
      key: history.push(elements) - 1
    }

    window.history.pushState(state, title.innerHTML, url)
    history.push(elements)
  }

  if (title.matches('.anticore > title')) {
    elements.forEach(replace)
  }
})

listen('popstate', window, ({ state: { key } }) => {
  history[key] && history[key].forEach(replace)
})
