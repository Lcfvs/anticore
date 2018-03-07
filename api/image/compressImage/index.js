import {curry} from '../../../primitive/function/curry';
import {create} from '../../../primitive/object/create';
import {canvasToBlob} from '../../canvas/canvasToBlob';
import {canvasToImage} from '../../canvas/canvasToImage';
import {imageToCanvas} from '../imageToCanvas';

export function compressImage(options, img) {
  return imageToCanvas(img)
  .then(curry(compress, options))
  .then(curry(canvasToImage, options));
}

function compress(options, canvas) {
  return canvasToBlob(options, canvas)
  .then(curry(read, options, canvas));
}

function read(options, canvas, blob) {
  const
  size = blob.size;

  if (!options.maxSize || size < options.maxSize) {
    return canvas;
  }

  options = create(options);
  options.quality = (options.quality || 1) / (size / options.maxSize);

  return compress(options, canvas);
}