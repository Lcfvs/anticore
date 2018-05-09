import { on } from '..'
import { matches } from '../../.matches'

export function onShiftEnter (element, listener, useCapture) {
  return on('keydown', element, function (event) {
    if (matches(event, false, false, true, ['Enter'], 13)) {
      return listener.call(this, event)
    }
  }, useCapture)
}
