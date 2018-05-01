import { on } from '..'

export function onSubmit (element, listener, useCapture) {
  return on('submit', element, listener, useCapture)
}
