import { once } from '..'

export function onceShiftEnter (element, listener, useCapture) {
  return once('keydown', element, listener, useCapture)
}
