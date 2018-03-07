import {blobToBuffer} from '../../blob/blobToBuffer/index';
import {imageToBlob} from '../imageToBlob/index';

export function imageToBuffer(options, img) {
  return imageToBlob(options, img)
  .then(blobToBuffer);
}