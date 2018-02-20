import {once} from '..';

export function onceSpace(element, listener, useCapture) {
  return once('keydown', element, listener, useCapture);
}