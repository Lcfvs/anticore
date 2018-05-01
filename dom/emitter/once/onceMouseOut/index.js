import { once } from '..'

export function onceMouseOut (element, listener, useCapture) {
  return once('mouseout', element, listener, useCapture)
}
