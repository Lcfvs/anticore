import { getTypeOf } from '../getTypeOf'

export function isObject (value) {
  return getTypeOf(value) === 'object' && value !== null
}
