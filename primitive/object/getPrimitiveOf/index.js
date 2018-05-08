import { global } from '../../../global'
import { indexOf } from '../../array/indexOf'
import { isNull } from '../../null/isNull'
import { getTypeOf } from '../getTypeOf'
import { toString } from '../toString'

const window = global()
const getPrototypeOf = Object.getPrototypeOf
const constructors = [
  window.Array,
  window.Function,
  window.Number,
  window.String,
  window.Symbol
]

export function getPrimitiveOf (value) {
  const type = getTypeOf(value)

  if (type !== 'object') {
    return type
  }

  if (isNull(value)) {
    return 'null'
  }

  const prototype = getPrototypeOf(value)

  if (isNull(prototype)) {
    return type
  }

  const constructor = prototype.constructor

  if (indexOf(constructors, constructor) > -1) {
    return constructor.name.toLowerCase()
  }

  return getPrimitiveOf(prototype)
}
