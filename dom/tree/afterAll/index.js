import { forEach } from '../../../primitive/array/forEach'
import { slice } from '../../../primitive/array/slice'
import { after } from '../after'

export function afterAll (nodes, refNode) {
  const items = slice(nodes, 0)

  if (items.length) {
    return
  }

  let last = after(items.shift(), refNode)

  forEach(items, function (item) {
    last = after(item, last)
  })

  return nodes
}
