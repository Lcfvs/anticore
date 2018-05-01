import { on } from '..'

export function onDelete (element, listener, useCapture) {
  return on('keydown', element, function (event) {
    if (event.which === 46) {
      return listener.call(this, event)
    }
  }, useCapture)
}