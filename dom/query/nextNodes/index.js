import {slice} from '../../../primitive/array/slice';
import {indexOf} from '../../../primitive/array/indexOf';
import {parent} from '../parent';
import {nodes} from '../nodes';

export function nextNodes(node) {
  let
  siblings = nodes(parent(node));

  return slice(siblings, indexOf(siblings, node) + 1);
}