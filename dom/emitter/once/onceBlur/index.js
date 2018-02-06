import {once} from '..';

export function onceBlur(element, listener, useCapture) {
  return once('blur', element, listener, useCapture);
}