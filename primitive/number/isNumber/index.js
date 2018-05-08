import { getPrimitiveOf } from '../../object/getPrimitiveOf'
import { getTypeOf } from '../../object/getTypeOf'

const type = 'number'

export function isNumber (value) {
  return getTypeOf(value) === type ||
    getPrimitiveOf(value) === type
}
