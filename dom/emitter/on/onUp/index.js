import { on } from '..'

export function onUp (element, listener, useCapture) {
  return on('keydown', element, function (event) {
    if (event.which === 38) {
      return listener.call(this, event)
    }
  }, useCapture)
}