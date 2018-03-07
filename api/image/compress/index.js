import {curry} from '../../../primitive/function/curry/index';
import {canvasToImage} from '../../canvas/canvasToImage/index';
import {imageToCanvas} from '../imageToCanvas/index';

export function compress(options, img) {
  return imageToCanvas(img)
  .then(curry(canvasToImage, options));
}