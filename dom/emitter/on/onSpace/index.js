import { on } from '..'
import { matches } from '../../.matches'

export function onSpace (element, listener, useCapture) {
  return on('keydown', element, function (event) {
    if (matches(event, false, false, false, [' ', 'Spacebar'], 32)) {
      return listener.call(this, event)
    }
  }, useCapture)
}
