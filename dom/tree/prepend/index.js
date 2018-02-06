import {before} from '../before';
import {firstNode} from '../../query/firstNode';

export function prepend(node, parent) {
  return before(node, firstNode(parent), parent);
}