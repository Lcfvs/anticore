import { isObject } from '../../../primitive/object/isObject'

export function isText (node) {
  return isObject(node) && node.nodeType === 3
}
