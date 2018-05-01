import { once } from '..'

export function onceRight (element, listener, useCapture) {
  return once('keydown', element, listener, useCapture)
}
