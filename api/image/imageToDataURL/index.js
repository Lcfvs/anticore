import {blobToDataURL} from '../../blob/blobToDataURL/index';
import {imageToBlob} from '../imageToBlob/index';

export function imageToDataURL(options, img) {
  return imageToBlob(options, img)
  .then(blobToDataURL);
}