import {once} from '..';

export function onceDrag(element, listener, useCapture) {
  return once('keydown', element, listener, useCapture);
}