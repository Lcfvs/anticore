import {isElement} from '../../info/isElement/index';
import {isUndefined} from '../../../primitive/undefined/isUndefined';

export function text(node, data) {
  if (isElement(node)) {
    if (!isUndefined(data)) {
      node.textContent = data;
    }

    return node.textContent;
  }

  if (!isUndefined(data)) {
    node.nodeValue = data;
  }

  return node.nodeValue;
}