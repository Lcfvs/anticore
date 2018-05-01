import { once } from '..'

export function onceInput (element, listener, useCapture) {
  return once('input', element, listener, useCapture)
}
