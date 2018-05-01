import { indexOf } from '../../../primitive/array/indexOf'
import { parent } from '../../query/parent'
import { start } from '../start'

export function next (node, targets) {
  let
    key = indexOf(targets, node)

  while (node = targets[key += 1]) {
    if (parent(node)) {
      return start(node)
    }
  }
}