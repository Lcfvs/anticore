import { on } from '..'

export function onClick (element, listener, useCapture) {
  return on('click', element, listener, useCapture)
}