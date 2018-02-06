import {slice} from '../../../primitive/array/slice';
import {indexOf} from '../../../primitive/array/indexOf';
import {parent} from '../parent';
import {nodes} from '../nodes';

export function previousNodes(node) {
  let
  siblings = nodes(parent(node));

  return slice(siblings, 0, indexOf(siblings, node));
}