import {blobToText} from '../../blob/blobToText/index';
import {imageToBlob} from '../imageToBlob/index';

export function imageToText(options, img) {
  return imageToBlob(options, img)
  .then(blobToText);
}