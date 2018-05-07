import { forEach } from '../../../primitive/array/forEach'
import { isElement } from '../../info/isElement'
import { elements } from '../../query/elements'

export function sanitize (node) {
  if (isElement(node)) {
    if (node.hasAttributes()) {
      forEach(node.attributes, unlistener)
    }

    forEach(elements(node), sanitize)
  }

  return node
}

function unlistener (attribute) {
  if (attribute.name.substr(0, 2).toLowerCase() === 'on') {
    attribute.ownerElement.removeAttribute(attribute.name)
  }
}
