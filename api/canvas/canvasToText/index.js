import {blobToText} from '../../blob/blobToText';
import {canvasToBlob} from '../canvasToBlob/index';

export function canvasToText(options, canvas) {
  return canvasToBlob(options, canvas)
  .then(blobToText);
}