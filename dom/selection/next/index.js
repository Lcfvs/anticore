import {indexOf} from '../../../primitive/array/indexOf';
import {start} from '../start';
import {parent} from '../../query/parent';

export function next(node, targets) {
  let
  key = indexOf(targets, node);

  while (node = targets[key += 1]) {
    if (parent(node)) {
      return start(node);
    }
  }
}