import { getPrimitiveOf } from '../../object/getPrimitiveOf'
import { getTypeOf } from '../../object/getTypeOf'

const type = 'symbol'

export function isSymbol (value) {
  return getTypeOf(value) === type ||
    getPrimitiveOf(value) === type
}
