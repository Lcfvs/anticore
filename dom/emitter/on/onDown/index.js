import {on} from '..';

export function onDown(element, listener, useCapture) {
  return on('keydown', element, function(event) {
    if (event.which === 40) {
      return listener.call(this, event);
    }
  }, useCapture);
}