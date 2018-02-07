import {text} from '../../tree/text';
import {isElement} from '../isElement';
import {one} from '../../query/one';

export function isEmpty(node) {
  return (!isElement(node) || !one('*', node))
  && !(text(node) || '').trim().length;
}