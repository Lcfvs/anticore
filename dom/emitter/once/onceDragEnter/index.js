import { once } from '..'

export function onceDragEnter (element, listener, useCapture) {
  return once('dragenter', element, listener, useCapture)
}