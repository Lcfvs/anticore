import {before} from '../before';
import {nextNode} from '../../query/nextNode';
import {parent} from '../../query/parent';

export function after(node, refNode) {
  return before(node, nextNode(refNode), parent(refNode));
}