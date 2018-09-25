import { on } from '..'

export function onMessage (element, listener, useCapture) {
  return on('message', element, listener, useCapture)
}
