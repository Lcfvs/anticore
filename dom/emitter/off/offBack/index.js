import {off} from '..';

export function offBack(element, listener, useCapture) {
  return off('keydown', element, listener, useCapture);
}