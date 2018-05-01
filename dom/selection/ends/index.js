import { all } from '../../query/all'
import { lastNode } from '../../query/lastNode'
import { current } from '../current'

export function ends (node) {
  const selection = current()
  const anchor = selection.anchorNode
  const offset = selection.anchorOffset
  const elements = all('*', node)
  const last = lastNode(elements[elements.length - 1])

  return anchor === last &&
    last.nodeValue.length - 1 === offset
}
