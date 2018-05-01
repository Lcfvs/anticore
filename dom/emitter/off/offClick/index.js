import { off } from '..'

export function offClick (element, listener, useCapture) {
  return off('click', element, listener, useCapture)
}