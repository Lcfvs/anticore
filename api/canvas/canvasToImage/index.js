import {blobToImage} from '../../blob/blobToImage';
import {canvasToBlob} from '../canvasToBlob';

export function canvasToImage(options, canvas) {
  return canvasToBlob(options, canvas)
  .then(blobToImage);
}