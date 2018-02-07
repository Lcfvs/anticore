import {text} from '../../tree/text';
import {isElement} from '../isElement/index';
import {one} from '../../query/one';

export function isEmpty(node) {
  return (!isElement(node) || !one('*', node))
  && !(text(node) || '').trim().length;
}