import { contains } from '../../info/contains'
import { firstNode } from '../../query/firstNode'
import { parent } from '../../query/parent'
import { current } from '../current'

export function starts (node) {
  const selection = current()
  const offset = selection.anchorOffset
  let anchor = selection.anchorNode

  if (offset || !contains(anchor, node)) {
    return false
  }

  while (anchor) {
    if (firstNode(parent(anchor)) !== anchor) {
      return false
    }

    if (anchor === node || anchor === firstNode(node)) {
      return true
    }

    anchor = parent(anchor)
  }

  return false
}
