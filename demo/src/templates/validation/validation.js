import { load } from '../../lib/dom.js'

export const error = load(import.meta, 'error.html', {
  name: null,
  message: null
})

export const template = load(import.meta, 'template.html', {
  errors: null,
  *[Symbol.iterator] () {
    for (const pair of Object.entries(this)) {
      yield pair
    }
  }
})
