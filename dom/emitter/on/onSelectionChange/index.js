import { on } from '..'
import { document } from '../../../node/document'

export function onSelectionChange (listener, useCapture) {
  return on('selectionchange', document(), listener, useCapture)
}