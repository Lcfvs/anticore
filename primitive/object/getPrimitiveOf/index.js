import { isNull } from '../../null/isNull'
import { getTypeOf } from '../getTypeOf'

const getPrototypeOf = Object.getPrototypeOf

export function getPrimitiveOf (value) {
  const type = getTypeOf(value)

  if (type === 'object') {
    const prototype = getPrototypeOf(value)

    if (!isNull(prototype)) {
      return getPrimitiveOf(prototype)
    }
  }

  return type
}
