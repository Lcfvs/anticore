import {on} from '..';

export function onFocus(element, listener, useCapture) {
  return on('focus', element, listener, useCapture);
}