import {isString} from '../../../primitive/string/isString';
import {isNull} from '../../../primitive/null/isNull';
import {isNumber} from '../../../primitive/number/isNumber';
import {camelToDash} from '../../../primitive/string/camelToDash';

export function attr(element, name, value) {
  name = camelToDash(name);

  if (isString(value) || isNumber(value)) {
    element.setAttribute(name, value);

    return element;
  }

  if (isNull(value)) {
    element.removeAttribute(name);

    return element;
  }

  return element.getAttribute(name);
}