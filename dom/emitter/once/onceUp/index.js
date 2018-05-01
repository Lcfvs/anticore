import { once } from '..'

export function onceUp (element, listener, useCapture) {
  return once('keydown', element, listener, useCapture)
}
