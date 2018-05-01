import { parent } from '../../query/parent'

export function remove (node) {
  if (parent(node)) {
    parent(node).removeChild(node)
  }

  return node
}