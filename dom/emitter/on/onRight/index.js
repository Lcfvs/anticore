import { on } from '..'
import { matches } from '../../.matches'

export function onRight (element, listener, useCapture) {
  return on('keydown', element, function (event) {
    if (matches(event, ['ArrowRight', 'Right'], 39) && !event.shiftKey && !event.ctrlKey) {
      return listener.call(this, event)
    }
  }, useCapture)
}
