import { nodeName } from '../../../info/nodeName'
import { offChange } from '../offChange'
import { offDrop } from '../offDrop'

export function offFileInput (element, listener, useCapture) {
  if (nodeName(element) === 'input' && element.type === 'file') {
    offChange(element, listener, useCapture)
    offDrop(element, listener, useCapture)

    return listener
  }
}