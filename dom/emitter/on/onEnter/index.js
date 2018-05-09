import { on } from '..'
import { matches } from '../../.matches'

export function onEnter (element, listener, useCapture) {
  return on('keydown', element, function (event) {
    if (matches(event, false, false, false, ['Enter'], 13)) {
      return listener.call(this, event)
    }
  }, useCapture)
}
