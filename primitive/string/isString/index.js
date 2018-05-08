import { getPrimitiveOf } from '../../object/getPrimitiveOf'
import { getTypeOf } from '../../object/getTypeOf'

const type = 'string'

export function isString (value) {
  return getTypeOf(value) === type ||
    getPrimitiveOf(value) === type
}
