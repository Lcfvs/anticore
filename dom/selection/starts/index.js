import {current} from '../current';
import {parent} from '../../query/parent';
import {contains} from '../../info/contains';
import {firstNode} from '../../query/firstNode';

export function starts(node) {
  let
  selection = current(),
  anchor = selection.anchorNode,
  offset = selection.anchorOffset;

  if (offset || !contains(anchor, node)) {
    return false;
  }

  while (anchor) {
    if (firstNode(parent(anchor)) !== anchor) {
      return false;
    }

    if (anchor === node || anchor === firstNode(node)) {
      return true;
    }

    anchor = parent(anchor);
  }

  return false;
}