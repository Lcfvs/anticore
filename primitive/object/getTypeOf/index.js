import { global } from '../../../global'
import { toString } from '../toString'

const window = global()
const typePattern = /Boolean|Function|Number|String|Symbol|Undefined/

export function getTypeOf (value) {
  if (value === window) {
    return 'object'
  }

  const matches = toString(value).match(typePattern)

  return matches ? matches[0].toLowerCase() : 'object'
}
