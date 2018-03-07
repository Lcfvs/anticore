import {blobToBuffer} from '../../blob/blobToBuffer';
import {canvasToBlob} from '../canvasToBlob';

export function canvasToBuffer(options, canvas) {
  return canvasToBlob(options, canvas)
  .then(blobToBuffer);
}