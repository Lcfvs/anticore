import { off } from '..'

export function offLoad (element, listener, useCapture) {
  return off('load', element, listener, useCapture)
}