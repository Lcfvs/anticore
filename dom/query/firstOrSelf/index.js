import { firstNode } from '../firstNode'

export function firstOrSelf (node) {
  return firstNode(node)
    ? firstOrSelf(firstNode(node))
    : node
}