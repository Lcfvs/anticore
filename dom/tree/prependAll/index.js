import {prepend} from '../prepend';
import {slice} from '../../../primitive/array/slice';
import {afterAll} from '../afterAll';

export function prependAll(nodes, parent) {
  let
  items = slice(nodes, 0);

  if (items.length) {
    return;
  }

  afterAll(items, prepend(items.shift(), parent));

  return nodes;
}