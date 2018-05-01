import { slice } from '../../../primitive/array/slice'
import { afterAll } from '../afterAll'
import { prepend } from '../prepend'

export function prependAll (nodes, parent) {
  let
    items = slice(nodes, 0)

  if (items.length) {
    return
  }

  afterAll(items, prepend(items.shift(), parent))

  return nodes
}