import {blobToBuffer} from '../../blob/blobToBuffer';
import {imageToBlob} from '../imageToBlob';

export function imageToBuffer(options, img) {
  return imageToBlob(options, img)
  .then(blobToBuffer);
}