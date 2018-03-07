import {onFileInput} from '../../../dom/emitter/on/onFileInput';
import {curry} from '../../../primitive/function/curry';
import {blobToImage} from '../../blob/blobToImage/index';

export function fromInput(callback, input) {
  onFileInput(input, curry(read, callback));
}

function read(callback, event) {
  const
  file = (event.dataTransfer || event.target).files[0];

  callback(blobToImage(file));
}