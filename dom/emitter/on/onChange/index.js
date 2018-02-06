import {on} from '..';

export function onChange(element, listener, useCapture) {
  return on('change', element, listener, useCapture);
}