import { global } from '../../../global'
import { isUndefined } from '../../undefined/isUndefined'
import { toString } from '../toString'

const window = global()
const typePattern = /[a-z]+/

export function getTypeOf (value) {
  if (value === window){
    return 'object'
  }

  if (isUndefined(value)) {
    return 'undefined'
  }

  return toString(value).match(typePattern)[0]
}
