import {global} from '../../../global';
import {promise} from '../../../primitive/function/promise';

const
window = global(),
createObjectURL = window.URL.createObjectURL;

export function blobToDataURL(blob) {
  return promise(read, blob);
}

function read(blob, resolve) {
  resolve(createObjectURL(blob));
}