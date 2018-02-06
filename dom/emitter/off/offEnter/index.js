import {off} from '..';

export function offEnter(element, listener, useCapture) {
  return off('keydown', element, listener, useCapture);
}