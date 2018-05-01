import { promise } from '../../../primitive/function/promise'

export function canvasToBlob (options, canvas) {
  return promise(toBlob, options, canvas)
}

function toBlob (options, canvas, resolve) {
  canvas.toBlob(resolve, options.mime, options.quality || 1)
}
