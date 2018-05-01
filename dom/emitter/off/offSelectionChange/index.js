import { off } from '..'
import { document } from '../../../node/document'

export function offSelectionChange (listener, useCapture) {
  return off('selectionchange', document(), listener, useCapture)
}