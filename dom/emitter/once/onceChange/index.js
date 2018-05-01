import { once } from '..'

export function onceChange (element, listener, useCapture) {
  return once('change', element, listener, useCapture)
}
