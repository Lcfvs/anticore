import { indexOf } from '../../../primitive/array/indexOf'
import { parent } from '../../query/parent'
import { end } from '../end'

export function previous (node, targets) {
  let
    key = indexOf(targets, node)

  while (node = targets[key -= 1]) {
    if (parent(node)) {
      return end(node)
    }
  }
}