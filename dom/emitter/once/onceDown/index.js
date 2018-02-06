import {once} from '..';

export function onceDown(element, listener, useCapture) {
  return once('keydown', element, listener, useCapture);
}