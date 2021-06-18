import * as dom from '@lcf.vs/dom-engine/lib/backend.js'
import { readFileSync } from 'fs'
import resolve from './resolve.js'

const fragment = dom.template('{partials}', {
  partials: ''
})

export function load ({ url }, name, { ...data } = {}) {
  return dom.template(readFileSync(resolve(url, name)).toString(), data)
}

export function serialize (node) {
  return dom.serialize(node)
}

export function render (layout, view, xhr, partials = null) {
  return xhr
    ? partials
      ? serialize({ ...fragment, partials: Object.values(partials) })
      : serialize({ ...fragment, partials: Object.values(view) })
    : serialize({
      ...layout,
      ...view,
      main: {
        ...view.main,
        partials: partials || view.main.partials
      }
    })
}
