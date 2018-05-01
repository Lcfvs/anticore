import { once } from '..'

export function onceMouseOver (element, listener, useCapture) {
  return once('mouseover', element, listener, useCapture)
}