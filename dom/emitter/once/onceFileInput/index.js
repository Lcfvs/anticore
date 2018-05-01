import { nodeName } from '../../../info/nodeName'
import { onceChange } from '../onceChange'
import { onceDrop } from '../onceDrop'

export function onceFileInput (element, listener, useCapture) {
  if (nodeName(element) === 'input' && element.type === 'file') {
    onceChange(element, listener, useCapture)
    onceDrop(element, listener, useCapture)

    return listener
  }
}