import { load } from '../../../lib/dom.js'

export const template = load(import.meta, 'template.html', {
  class: 'home',
  description: 'A homepage page which contains an anchor to access to the form',
  title: 'An anticore starter micro-website'
})
