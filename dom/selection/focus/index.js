import { current } from '../current'

export function focus (node) {
  node.focus()
}

focus.node = function () {
  return current().focusNode
}

focus.offset = function () {
  return current().focusOffset
}