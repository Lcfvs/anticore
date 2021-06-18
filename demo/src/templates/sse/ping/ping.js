import { load } from '../../../lib/dom.js'

export const template = load(import.meta, 'template.html', {
  data: {
    counter: 0
  }
})
