import { forEach } from '../../../primitive/array/forEach'
import { slice } from '../../../primitive/array/slice'
import { wrap } from '../wrap'

export function wrapAll (nodes, wrapper) {
  forEach(slice(nodes, 0), function (node) {
    wrap(node, wrapper)
  })

  return wrapper
}