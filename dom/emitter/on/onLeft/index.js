import { on } from '..'
import { matches } from '../../.matches'

export function onLeft (element, listener, useCapture) {
  return on('keydown', element, function (event) {
    if (matches(event, ['ArrowLeft', 'Left'], 37) && !event.shiftKey && !event.ctrlKey) {
      return listener.call(this, event)
    }
  }, useCapture)
}
