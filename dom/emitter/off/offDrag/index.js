import {off} from '..';

export function offDrag(element, listener, useCapture) {
  return off('keydown', element, listener, useCapture);
}