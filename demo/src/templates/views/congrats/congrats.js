import { load } from '../../../lib/dom.js'

export const template = load(import.meta, 'template.html', {
  class: 'congrats',
  description: 'A page which congrats you for your response',
  title: 'Congratulations'
})
