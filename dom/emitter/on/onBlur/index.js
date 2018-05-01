import { on } from '..'

export function onBlur (element, listener, useCapture) {
  return on('blur', element, listener, useCapture)
}
