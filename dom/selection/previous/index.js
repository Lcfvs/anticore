import {indexOf} from '../../../primitive/array/indexOf';
import {end} from '../end';
import {parent} from '../../query/parent';

export function previous(node, targets) {
  let
  key = indexOf(targets, node);

  while (node = targets[key -= 1]) {
    if (parent(node)) {
      return end(node);
    }
  }
}