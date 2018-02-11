import {offChange} from '../offChange';
import {offDrop} from '../offDrop';
import {nodeName} from '../../../info/nodeName';

export function offFileInput(element, listener, useCapture) {
  if (nodeName(element) === 'input' && element.type === 'file') {
    offChange(element, listener, useCapture);
    offDrop(element, listener, useCapture);

    return listener;
  }
}