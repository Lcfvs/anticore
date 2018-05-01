import { global } from '../../../global'

const window = global()
const HTMLCollection = window.HTMLCollection
const NodeList = window.NodeList

export function isCollection (contents) {
  return contents instanceof HTMLCollection ||
    contents instanceof NodeList
}
