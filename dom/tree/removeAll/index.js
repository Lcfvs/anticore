import {forEach} from '../../../primitive/array/forEach';
import {remove} from '../remove';
import {slice} from '../../../primitive/array/slice';

export function removeAll(nodes) {
  forEach(slice(nodes, 0), remove);

  return nodes;
}