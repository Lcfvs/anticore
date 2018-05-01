import { on } from '..'

export function onLeft (element, listener, useCapture) {
  return on('keydown', element, function (event) {
    if (event.which === 37) {
      return listener.call(this, event)
    }
  }, useCapture)
}