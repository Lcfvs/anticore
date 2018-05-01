import { all } from '../../query/all'
import { lastNode } from '../../query/lastNode'
import { current } from '../current'

export function ends (node) {
  let
    selection = current(),
    anchor = selection.anchorNode,
    offset = selection.anchorOffset,
    elements = all('*', node),
    last = lastNode(elements[elements.length - 1])

  return anchor === last
    && last.nodeValue.length - 1 === offset
}