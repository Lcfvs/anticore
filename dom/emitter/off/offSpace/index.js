import { off } from '..'

export function offSpace (element, listener, useCapture) {
  return off('keydown', element, listener, useCapture)
}