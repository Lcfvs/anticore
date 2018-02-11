import {off} from '..';

export function offDrag(element, listener, useCapture) {
  return off('drag', element, listener, useCapture);
}