import {create} from '../../../primitive/object/create';
import {curry} from '../../../primitive/function/curry';
import {promise} from '../../../primitive/function/promise';

export function canvasToBlob(options, canvas) {
  let
  promised = promise(toBlob, options, canvas);

  if (!options.maxSize) {
    return promised;
  }

  return promised
  .then(curry(read, options, canvas));
}

function toBlob(options, canvas, resolve) {
  canvas.toBlob(resolve, options.mime, options.quality);
}

function read(options, canvas, blob) {
  const
  size = blob.size;

  if (size < options.maxSize) {
    return blob;
  }

  options = create(options);
  options.quality = options.quality / (size / options.maxSize);

  return canvasToBlob(options, canvas);
}