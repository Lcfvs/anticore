import {parent} from '../../query/parent';

export function before(node, refNode, parentNode) {
  if (refNode) {
    parent(refNode).insertBefore(node, refNode);
  } else {
    parentNode.appendChild(node);
  }

  return node;
}