import { on } from '..'

export function onMouseOver (element, listener, useCapture) {
  return on('mouseover', element, listener, useCapture)
}
