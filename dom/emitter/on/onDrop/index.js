import {on} from '..';

export function onDrop(element, listener, useCapture) {
  return on('drop', element, listener, useCapture);
}