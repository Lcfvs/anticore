import { on } from '..'

export function onShiftEnter (element, listener, useCapture) {
  return on('keydown', element, function (event) {
    if (event.which === 13 && event.shiftKey && !event.ctrlKey) {
      return listener.call(this, event)
    }
  }, useCapture)
}