import { document } from '../../node/document'
import { current } from '../current'

export function select (node, begin, end) {
  const range = document().createRange()
  const selection = current()

  range.selectNodeContents(node)

  if (Number.isInteger(begin)) {
    range.setStart(node, begin)
  }

  if (Number.isInteger(end)) {
    range.setEnd(node, end)
  }

  selection.removeAllRanges()
  selection.addRange(range)

  if (!Number.isInteger(begin)) {
    selection.collapseToEnd()
  }

  if (!Number.isInteger(end)) {
    selection.collapseToStart()
  }

  return node
}
