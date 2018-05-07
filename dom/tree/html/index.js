import { isUndefined } from '../../../primitive/undefined/isUndefined'
import { isElement } from '../../info/isElement'
import { sanitize } from '../sanitize'

export function html (element, data) {
  if (isElement(element)) {
    if (!isUndefined(data)) {
      element.innerHTML = data
      sanitize(element.innerHTML)

      return element
    }

    return element.innerHTML
  }
}
