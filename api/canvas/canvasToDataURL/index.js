import {blobToDataURL} from '../../blob/blobToDataURL';
import {canvasToBlob} from '../canvasToBlob';

export function canvasToDataURL(options, canvas) {
  return canvasToBlob(options, canvas)
  .then(blobToDataURL);
}