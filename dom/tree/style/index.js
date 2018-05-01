import { global } from '../../../global'
import { demethodize } from '../../../primitive/function/demethodize'
import { isNull } from '../../../primitive/null/isNull'
import { isNumber } from '../../../primitive/number/isNumber'
import { camelToDash } from '../../../primitive/string/camelToDash'
import { dashToCamel } from '../../../primitive/string/dashToCamel'
import { isString } from '../../../primitive/string/isString'

const getStyle = demethodize(global().getComputedStyle)

export function style (element, name, value) {
  if (isString(value) || isNumber(value) || isNull(value)) {
    element.style[dashToCamel(name)] = value

    return element
  }

  return getStyle(element)[camelToDash(name)]
}