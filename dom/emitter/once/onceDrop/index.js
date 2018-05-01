import { once } from '..'

export function onceDrop (element, listener, useCapture) {
  return once('drop', element, listener, useCapture)
}
