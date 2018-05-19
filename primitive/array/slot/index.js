import { demethodize } from '../../function/demethodize'

const apply = demethodize(Array.apply, Array, null)

export function slot (length) {
  return apply({
    length
  })
}
