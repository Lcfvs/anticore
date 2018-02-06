import {isString} from '../../../primitive/string/isString';
import {isNull} from '../../../primitive/null/isNull';
import {isNumber} from '../../../primitive/number/isNumber';
import {dashToCamel} from '../../../primitive/string/dashToCamel';

export function data(element, name, value) {
  name = dashToCamel(name);

  if (isString(value) || isNumber(value) || isNull(value)) {
    element.dataset[name] = value;

    return element;
  }

  return element.dataset[name];
}