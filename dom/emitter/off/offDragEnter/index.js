import { off } from '..'

export function offDragEnter (element, listener, useCapture) {
  return off('dragenter', element, listener, useCapture)
}
