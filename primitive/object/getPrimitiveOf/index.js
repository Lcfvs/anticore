import { global } from '../../../global'
import { indexOf } from '../../array/indexOf'
import { isNull } from '../../null/isNull'
import { toLowerCase } from '../../string/toLowerCase'
import { getTypeOf } from '../getTypeOf'

const window = global()
const getPrototypeOf = Object.getPrototypeOf
const constructors = [
  window.Boolean,
  window.Function,
  window.Number,
  window.String,
  window.Symbol
]

export function getPrimitiveOf (value) {
  if (isNull(value)) {
    return 'null'
  }

  const type = getTypeOf(value)

  if (type !== 'object') {
    return type
  }

  const prototype = getPrototypeOf(value)

  if (isNull(prototype)) {
    return type
  }

  const constructor = prototype.constructor

  if (indexOf(constructors, constructor) > -1) {
    return toLowerCase(constructor.name)
  }

  return getPrimitiveOf(prototype)
}
