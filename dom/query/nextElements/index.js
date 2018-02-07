import {filter} from '../../../primitive/array/filter';
import {isElement} from '../../info/isElement';
import {nextNodes} from '../nextNodes';

export function nextElements(node) {
  return filter(nextNodes(node), isElement);
}