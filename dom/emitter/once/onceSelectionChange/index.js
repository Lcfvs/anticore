import { once } from '..'
import { document } from '../../../node/document'

export function onceSelectionChange (listener, useCapture) {
  return once('selectionchange', document(), listener, useCapture)
}