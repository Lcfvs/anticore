import { off } from '..'

export function offMessage (element, listener, useCapture) {
  return off('message', element, listener, useCapture)
}
