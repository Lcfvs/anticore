import { global } from '../../../global'
import { isInstanceOf } from '../../../primitive/object/isInstanceOf'

const window = global()
const HTMLCollection = window.HTMLCollection
const NodeList = window.NodeList

export function isCollection (contents) {
  return isInstanceOf(HTMLCollection, contents) ||
    isInstanceOf(NodeList, contents)
}
