import {off} from '..';

export function offRight(element, listener, useCapture) {
  return off('keydown', element, listener, useCapture);
}