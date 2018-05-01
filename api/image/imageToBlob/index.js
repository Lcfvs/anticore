import { curry } from '../../../primitive/function/curry'
import { canvasToBlob } from '../../canvas/canvasToBlob'
import { imageToCanvas } from '../imageToCanvas'

export function imageToBlob (options, img) {
  return imageToCanvas(img).then(curry(canvasToBlob, options))
}