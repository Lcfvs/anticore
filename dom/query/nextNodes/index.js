import { indexOf } from '../../../primitive/array/indexOf'
import { slice } from '../../../primitive/array/slice'
import { nodes } from '../nodes'
import { parent } from '../parent'

export function nextNodes (node) {
  let
    siblings = nodes(parent(node))

  return slice(siblings, indexOf(siblings, node) + 1)
}
