import {global} from '../../../global';
import {curry} from '../../../primitive/function/curry';
import {promise} from '../../../primitive/function/promise';

const
window = global(),
FileReader = window.FileReader;

export function blobToDataURL(blob) {
  return promise(read, blob);
}

function read(blob, resolve) {
  const
  reader = new FileReader();

  reader.addEventListener('load', curry(onLoad, resolve));
  reader.readAsDataURL(blob);
}

function onLoad(resolve, event) {
  resolve(event.target.result);
}