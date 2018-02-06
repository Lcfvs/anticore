import {prepend} from '../prepend';
import {forEach} from '../../../primitive/array/forEach';
import {slice} from '../../../primitive/array/slice';
import {after} from '../after';

export function afterAll(nodes, refNode) {
  let
  items = slice(nodes, 0),
  last;

  if (items.length) {
    return;
  }

  last = after(items.shift(), refNode);

  forEach(items, function(item) {
    last = after(item, last);
  });

  return nodes;
}