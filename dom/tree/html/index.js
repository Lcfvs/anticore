import {isElement} from '../../info/isElement/isElement';
import {isUndefined} from '../../../primitive/undefined/isUndefined';

export function html(element, data) {
  if (isElement(element)) {
    if (!isUndefined(data)) {
      element.innerHTML = data;
      
      return element;
    }

    return element.innerHTML;
  }
}