import {off} from '..';

export function offChange(element, listener, useCapture) {
  return off('change', element, listener, useCapture);
}