import { isText } from '../../info/isText'
import { all } from '../../query/all'
import { parent } from '../../query/parent'

export function matches (selector, node) {
  let
    results = all(selector, node.document || node.ownerDocument),
    i = results.length

  if (isText(node)) {
    node = parent(node)
  }

  while (--i >= 0 && results.item(i) !== node) {}

  return i > -1
}