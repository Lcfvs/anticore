import { isObject } from '../../../primitive/object/isObject'

export function isElement (node) {
  return isObject(node) && node.nodeType === 1
}
