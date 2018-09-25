import { once } from '..'

export function onceMessage (element, listener, useCapture) {
  return once('message', element, listener, useCapture)
}
