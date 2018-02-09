import {filter} from '../filter';
import {reverse} from '../reverse';

export function grep(values, callback, invert, thisArg) {
  return filter(invert ? reverse(values) : values, callback, thisArg);
}