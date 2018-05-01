import { off } from '..'

export function offDrop (element, listener, useCapture) {
  return off('drop', element, listener, useCapture)
}
