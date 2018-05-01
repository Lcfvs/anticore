import { on } from '..'

export function onError (element, listener, useCapture) {
  return on('error', element, listener, useCapture)
}