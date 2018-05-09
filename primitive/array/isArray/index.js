import { global } from '../../../global'
import { isInstanceOf } from '../../object/isInstanceOf'

const window = global()
const Array = window.Array

export function isArray (value) {
  return isInstanceOf(Array, value)
}
