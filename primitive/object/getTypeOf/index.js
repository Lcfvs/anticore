import { global } from '../../../global'
import { toString } from '../toString'

const window = global()
const typePattern = /[a-z]+/

export function getTypeOf (value) {
  return value === window
    ? 'object'
    : toString(value).match(typePattern)[0]
}
