import { off } from '..'

export function offMouseOver (element, listener, useCapture) {
  return off('mouseover', element, listener, useCapture)
}
