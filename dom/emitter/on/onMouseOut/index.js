import { on } from '..'

export function onMouseOut (element, listener, useCapture) {
  return on('mouseout', element, listener, useCapture)
}