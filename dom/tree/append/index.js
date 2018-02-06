import {before} from '../before';

export function append(node, parent) {
  return before(node, null, parent);
}