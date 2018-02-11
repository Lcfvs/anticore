import {onChange} from '../onChange';
import {onDrop} from '../onDrop';
import {nodeName} from '../../../info/nodeName';

export function onFileInput(element, listener, useCapture) {
  if (nodeName(element) === 'input' && element.type === 'file') {
    onChange(element, listener, useCapture);
    onDrop(element, listener, useCapture);

    return listener;
  }
}