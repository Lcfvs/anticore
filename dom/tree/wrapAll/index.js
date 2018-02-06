import {wrap} from '../wrap';
import {forEach} from '../../../primitive/array/forEach';
import {slice} from '../../../primitive/array/slice';

export function wrapAll(nodes, wrapper) {
  forEach(slice(nodes, 0), function (node) {
    wrap(node, wrapper);
  });

  return wrapper;
}