import {element} from '../../../dom/node/element';
import {update} from '../../../dom/tree/update';
import {promise} from '../../../primitive/function/promise/index';

export function imageToCanvas(img) {
  return promise(toCanvas, img);
}

function toCanvas(img, resolve) {
  const
  canvas = update(element('canvas'), {
    width: img.naturalWidth,
    height: img.naturalHeight
  }),
  context = canvas.getContext('2d');

  context.fillStyle = 'transparent';
  context.fillRect(0, 0, img.naturalWidth, img.naturalHeight);
  context.save();
  context.drawImage(img, 0, 0);
  resolve(canvas);
}