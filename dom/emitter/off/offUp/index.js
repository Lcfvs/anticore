import { off } from '..'

export function offUp (element, listener, useCapture) {
  return off('keydown', element, listener, useCapture)
}