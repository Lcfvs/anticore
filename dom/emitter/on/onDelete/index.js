import { on } from '..'
import { matches } from '../../.matches'

export function onDelete (element, listener, useCapture) {
  return on('keydown', element, function (event) {
    if (matches(event, false, false, ['Delete', 'Del'], 46)) {
      return listener.call(this, event)
    }
  }, useCapture)
}
