import { forEach } from '../../../primitive/array/forEach'
import { slice } from '../../../primitive/array/slice'
import { append } from '../append'

export function appendAll (nodes, parent) {
  forEach(slice(nodes, 0), function (node) {
    append(node, parent)
  })

  return nodes
}
