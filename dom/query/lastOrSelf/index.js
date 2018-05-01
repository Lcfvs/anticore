import { lastNode } from '../lastNode'

export function lastOrSelf (node) {
  return lastNode(node)
    ? lastOrSelf(lastNode(node))
    : node
}
