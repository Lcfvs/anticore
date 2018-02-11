import {on} from '..';

export function onLoad(element, listener, useCapture) {
  return on('load', element, listener, useCapture);
}