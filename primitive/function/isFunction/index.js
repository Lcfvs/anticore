import { getTypeOf } from '../../object/getTypeOf'

const type = 'function'

export function isFunction (value) {
  return getTypeOf(value) === type
}
