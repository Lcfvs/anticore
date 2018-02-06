import {once} from '..';

export function onceBack(element, listener, useCapture) {
  return once('keydown', element, listener, useCapture);
}