import {before} from '../before';
import {forEach} from '../../../primitive/array/forEach';
import {slice} from '../../../primitive/array/slice';

export function beforeAll(nodes, refNode, parent) {
  forEach(slice(nodes, 0), function (node) {
    before(node, refNode, parent);
  });

  return nodes;
}