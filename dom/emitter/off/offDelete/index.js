import {off} from '..';

export function offDelete(element, listener, useCapture) {
  return off('keydown', element, listener, useCapture);
}