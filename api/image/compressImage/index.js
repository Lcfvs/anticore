import {curry} from '../../../primitive/function/curry';
import {create} from '../../../primitive/object/create';
import {indexOf} from '../../../primitive/array/indexOf';
import {canvasToBlob} from '../../canvas/canvasToBlob';
import {canvasToImage} from '../../canvas/canvasToImage';
import {imageToCanvas} from '../imageToCanvas';

const mimes = ['image/jpeg', 'image/webp'];

export function compressImage(options, img) {
  if (indexOf(mimes, options.mime) === -1) {
    return img;
  }
  
  return imageToCanvas(img)
  .then(curry(compress, options))
  .then(curry(canvasToImage, options));
}

function compress(options, canvas) {
  return canvasToBlob(options, canvas)
  .then(curry(read, options, canvas));
}

function read(options, canvas, blob) {
  if (!options.maxSize || blob.size < options.maxSize) {
    return canvas;
  }
  
  options.quality = 1 - options.maxSize / blob.size;

  return compress(options, canvas);
}