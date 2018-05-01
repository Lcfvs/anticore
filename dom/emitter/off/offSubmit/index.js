import { off } from '..'

export function offSubmit (element, listener, useCapture) {
  return off('submit', element, listener, useCapture)
}