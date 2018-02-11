import {once} from '..';

export function onceLoad(element, listener, useCapture) {
  return once('load', element, listener, useCapture);
}