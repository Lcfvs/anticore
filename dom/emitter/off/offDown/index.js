import {off} from '..';

export function offDown(element, listener, useCapture) {
  return off('keydown', element, listener, useCapture);
}