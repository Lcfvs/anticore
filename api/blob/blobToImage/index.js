import {global} from '../../../global';
import {dataURLToImage} from '../../dataURL/dataURLToImage/index';
import {blobToDataURL} from '../blobToDataURL/index';

const
window = global(),
revokeObjectURL = window.URL.revokeObjectURL;

export function blobToImage(blob) {
  return blobToDataURL(blob)
  .then(dataURLToImage)
  .then(revoke);
}

function revoke(target) {
  revokeObjectURL(target.src);

  return target;
}