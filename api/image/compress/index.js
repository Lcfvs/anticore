import {curry} from '../../../primitive/function/curry';
import {canvasToImage} from '../../canvas/canvasToImage';
import {imageToCanvas} from '../imageToCanvas';

export function compress(options, img) {
  return imageToCanvas(img)
  .then(curry(canvasToImage, options));
}