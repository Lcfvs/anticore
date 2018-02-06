import {once} from '..';

export function onceEnter(element, listener, useCapture) {
  return once('keydown', element, listener, useCapture);
}