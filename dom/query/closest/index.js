import { matches } from '../../info/matches'
import { parent } from '../parent'

export function closest (selector, node) {
  let last = node
  let current = parent(last)

  while (current) {
    if (matches(selector, current)) {
      return current
    }

    last = current
    current = parent(last)
  }

  return null
}
