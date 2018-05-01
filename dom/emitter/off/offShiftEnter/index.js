import { off } from '..'

export function offShiftEnter (element, listener, useCapture) {
  return off('keydown', element, listener, useCapture)
}