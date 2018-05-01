import { forEach } from '../../../primitive/array/forEach'
import { slice } from '../../../primitive/array/slice'
import { remove } from '../remove'

export function removeAll (nodes) {
  forEach(slice(nodes, 0), remove)

  return nodes
}