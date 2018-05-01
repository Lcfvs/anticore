import { off } from '..'

export function offError (element, listener, useCapture) {
  return off('error', element, listener, useCapture)
}