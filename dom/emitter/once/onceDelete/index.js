import {once} from '..';

export function onceDelete(element, listener, useCapture) {
  return once('keydown', element, listener, useCapture);
}