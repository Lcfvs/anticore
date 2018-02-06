import {off} from '..';

export function offFocus(element, listener, useCapture) {
  return off('focus', element, listener, useCapture);
}