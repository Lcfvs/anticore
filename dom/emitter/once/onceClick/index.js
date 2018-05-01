import { once } from '..'

export function onceClick (element, listener, useCapture) {
  return once('click', element, listener, useCapture)
}