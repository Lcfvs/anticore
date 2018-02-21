import {once} from '..';

export function onceError(element, listener, useCapture) {
  return once('error', element, listener, useCapture);
}