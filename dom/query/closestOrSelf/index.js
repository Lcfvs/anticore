import { isElement } from '../../info/isElement'
import { matches } from '../../info/matches'
import { closest } from '../closest'

export function closestOrSelf (selector, node) {
  return isElement(node) && matches(selector, node)
    ? node
    : closest(selector, node)
}