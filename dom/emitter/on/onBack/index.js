import { on } from '..'
import { matches } from '../../.matches'

export function onBack (element, listener, useCapture) {
  return on('keydown', element, function (event) {
    if (matches(event, false, false, ['Backspace'], 8)) {
      return listener.call(this, event)
    }
  }, useCapture)
}
