import { matches } from '../../info/matches'
import { parent } from '../parent'

export function closest (selector, node) {
  let
    last = node,
    current

  while (current = parent(last)) {
    if (matches(selector, current)) {
      return current
    }

    last = current
  }

  return null
}