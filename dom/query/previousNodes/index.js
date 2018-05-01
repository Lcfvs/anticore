import { indexOf } from '../../../primitive/array/indexOf'
import { slice } from '../../../primitive/array/slice'
import { nodes } from '../nodes'
import { parent } from '../parent'

export function previousNodes (node) {
  let
    siblings = nodes(parent(node))

  return slice(siblings, 0, indexOf(siblings, node))
}