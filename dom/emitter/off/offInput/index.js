import {off} from '..';

export function offInput(element, listener, useCapture) {
  return off('input', element, listener, useCapture);
}