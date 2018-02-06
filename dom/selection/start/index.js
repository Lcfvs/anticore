import {firstOrSelf} from '../../query/firstOrSelf';
import {select} from '../select';

export function start(node) {
  let
  first = firstOrSelf(node);

  select(first, 0);

  return first;
}