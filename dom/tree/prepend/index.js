import { firstNode } from '../../query/firstNode'
import { before } from '../before'

export function prepend (node, parent) {
  return before(node, firstNode(parent), parent)
}