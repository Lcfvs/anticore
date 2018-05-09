import { on } from '..'
import { matches } from '../../.matches'

export function onUp (element, listener, useCapture) {
  return on('keydown', element, function (event) {
    if (matches(event, false, false, ['ArrowUp', 'Up'], 39)) {
      return listener.call(this, event)
    }
  }, useCapture)
}
