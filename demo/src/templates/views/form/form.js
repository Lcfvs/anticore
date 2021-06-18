import { load } from '../../../lib/dom.js'

export const template = load(import.meta, 'template.html', {
  class: 'form',
  data: null,
  description: 'A page which asks you for a response, using a form',
  title: 'Form title',
  validation: null
})
