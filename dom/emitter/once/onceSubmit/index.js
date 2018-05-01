import { once } from '..'

export function onceSubmit (element, listener, useCapture) {
  return once('submit', element, listener, useCapture)
}