import {curry} from '../../../primitive/function/curry';
import {canvasToBlob} from '../../canvas/canvasToBlob/index';
import {imageToCanvas} from '../imageToCanvas/index';

export function imageToBlob(options, img) {
  return imageToCanvas(img)
  .then(curry(canvasToBlob, options));
}