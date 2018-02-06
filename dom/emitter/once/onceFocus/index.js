import {once} from '..';

export function onceFocus(element, listener, useCapture) {
  return once('focus', element, listener, useCapture);
}