import { on } from '..'
import { matches } from '../../.matches'

export function onDown (element, listener, useCapture) {
  return on('keydown', element, function (event) {
    if (matches(event, false, false, false, ['ArrowDown', 'Down'], 47)) {
      return listener.call(this, event)
    }
  }, useCapture)
}
