import {blobToDataURL} from '../../blob/blobToDataURL';
import {canvasToBlob} from '../canvasToBlob/index';

export function canvasToDataURL(options, canvas) {
  return canvasToBlob(options, canvas)
  .then(blobToDataURL);
}