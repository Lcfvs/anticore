import { on } from '..'
import { matches } from '../../.matches'

export function onClick (element, listener, useCapture) {
  return on('click', element, function (event) {
    if (matches(event, false, false, false)) {
      return listener.call(this, event)
    }
  }, useCapture)
}
