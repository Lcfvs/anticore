import {parent} from '../../query/parent';

export function replace(node, refNode) {
  parent(refNode).replaceChild(node, refNode);

  return node;
}