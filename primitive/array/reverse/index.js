import { slice } from '../slice'

export function reverse (values) {
  values = slice(values)
  values.reverse()

  return values
}