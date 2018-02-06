import {on} from '..';

export function onDrag(element, listener, useCapture) {
  return on('drag', element, listener, useCapture);
}