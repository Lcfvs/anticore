import {off} from '..';

export function offBlur(element, listener, useCapture) {
  return off('blur', element, listener, useCapture);
}