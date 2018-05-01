import { element } from '../../../dom/node/element'
import { fragment } from '../../../dom/node/fragment'
import { nodes } from '../../../dom/query/nodes'
import { html } from '../../../dom/tree/html'

export function toDOM (data) {
  return fragment(nodes(html(element('body'), data)))
}
