import {append} from '../append';
import {forEach} from '../../../primitive/array/forEach';
import {slice} from '../../../primitive/array/slice';

export function appendAll(nodes, parent) {
  forEach(slice(nodes, 0), function (node) {
    append(node, parent);
  });

  return nodes;
}