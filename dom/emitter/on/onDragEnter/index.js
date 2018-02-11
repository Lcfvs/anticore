import {on} from '..';

export function onDragEnter(element, listener, useCapture) {
  return on('dragenter', element, listener, useCapture);
}