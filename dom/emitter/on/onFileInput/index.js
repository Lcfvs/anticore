import { nodeName } from '../../../info/nodeName'
import { prevent } from '../../prevent'
import { onChange } from '../onChange'
import { onDrop } from '../onDrop'

function trueListener (listener, event) {
  if (event.type === 'drop') {
    prevent(event)
  }

  listener.call(this, event)
}

export function onFileInput (element, listener, useCapture) {
  if (nodeName(element) === 'input' && element.type === 'file') {
    listener = trueListener.bind(element, listener)

    onChange(element, listener, useCapture)
    onDrop(element, listener, useCapture)

    return listener
  }
}