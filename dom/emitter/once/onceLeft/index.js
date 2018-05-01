import { once } from '..'

export function onceLeft (element, listener, useCapture) {
  return once('keydown', element, listener, useCapture)
}