import { on } from '..'

export function onInput (element, listener, useCapture) {
  return on('input', element, listener, useCapture)
}
