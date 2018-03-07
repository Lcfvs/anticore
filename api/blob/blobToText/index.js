import {getTarget} from '../../../dom/emitter/getTarget/index';
import {global} from '../../../global';
import {onceLoad} from '../../../dom/emitter/once/onceLoad';
import {onceError} from '../../../dom/emitter/once/onceError';
import {promise} from '../../../primitive/function/promise';

const
window = global(),
FileReader = window.FileReader;

export function blobToText(blob) {
  return promise(read, blob)
  .then(getTarget);
}

function read(blob, resolve, reject) {
  const
  reader = new FileReader();

  reader.readAsText(blob);
  onceLoad(reader, resolve);
  onceError(reader, reject);
}