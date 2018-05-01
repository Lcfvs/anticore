import { off } from '..'

export function offMouseOut (element, listener, useCapture) {
  return off('mouseout', element, listener, useCapture)
}
