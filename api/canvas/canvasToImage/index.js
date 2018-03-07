import {blobToImage} from '../../blob/blobToImage';
import {canvasToBlob} from '../canvasToBlob/index';

export function canvasToImage(options, canvas) {
  return canvasToBlob(options, canvas)
  .then(blobToImage);
}