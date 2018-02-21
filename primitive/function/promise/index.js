import {demethodize} from '../demethodize';
import {curry} from '../curry';

const
demethodizedCurry = demethodize(curry);

export function promise(fn, ...args) {
  return new Promise(demethodizedCurry(this, fn, ...args));
}