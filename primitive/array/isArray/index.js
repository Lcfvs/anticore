import { getPrimitiveOf } from '../../object/getPrimitiveOf'

const type = 'array'

export function isArray (value) {
  return getPrimitiveOf(value) === type
}
