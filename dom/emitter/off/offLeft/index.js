import { off } from '..'

export function offLeft (element, listener, useCapture) {
  return off('keydown', element, listener, useCapture)
}
