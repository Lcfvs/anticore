import {indexOf} from '../../../primitive/array/indexOf';
import {all} from '../../query/all';
import {parent} from '../../query/parent';

export function matches(selector, node) {
  let
  last = node,
  current;

  while (current = parent(last)) {
    if (indexOf(all(selector, current), last) > -1) {
      return true;
    }

    last = current;
  }

  return false;
}