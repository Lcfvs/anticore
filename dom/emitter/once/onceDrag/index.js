import { once } from '..'

export function onceDrag (element, listener, useCapture) {
  return once('drag', element, listener, useCapture)
}
