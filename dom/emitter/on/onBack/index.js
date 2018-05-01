import { on } from '..'

export function onBack (element, listener, useCapture) {
  return on('keydown', element, function (event) {
    if (event.which === 8 && !event.shiftKey && !event.ctrlKey) {
      return listener.call(this, event)
    }
  }, useCapture)
}
