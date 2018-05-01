import { on } from '..'

export function onRight (element, listener, useCapture) {
  return on('keydown', element, function (event) {
    if (event.which === 39) {
      return listener.call(this, event)
    }
  }, useCapture)
}