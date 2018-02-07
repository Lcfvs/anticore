import {filter} from '../../../primitive/array/filter';
import {isElement} from '../../info/isElement';
import {previousNodes} from '../previousNodes';

export function previousElements(node) {
  return filter(previousNodes(node), isElement);
}