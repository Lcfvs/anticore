import { forEach } from '../../../primitive/array/forEach'
import { isUndefined } from '../../../primitive/undefined/isUndefined'
import { isElement } from '../../info/isElement'
import { elements } from '../../query/elements'
import { sanitize } from '../sanitize'

export function html (element, data) {
  if (isElement(element)) {
    if (!isUndefined(data)) {
      element.innerHTML = data
      forEach(elements(element), sanitize)

      return element
    }

    return element.innerHTML
  }
}
