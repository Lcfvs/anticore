import {isElement} from '../../info/isElement/index';
import {html} from '../html';
import {text} from '../text';

export function empty(node) {
  if (isElement(node)) {
    html(node, '');
  } else {
    text(node, '');
  }

  return node;
}