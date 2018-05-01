import { getTarget } from '../../../dom/emitter/getTarget'
import { onceError } from '../../../dom/emitter/once/onceError'
import { onceLoad } from '../../../dom/emitter/once/onceLoad'
import { global } from '../../../global'
import { promise } from '../../../primitive/function/promise'

const window = global()
const Image = window.Image

export function dataURLToImage (url) {
  return promise(read, url).then(getTarget)
}

function read (url, resolve, reject) {
  const img = new Image()

  img.src = url
  onceLoad(img, resolve)
  onceError(img, reject)
}
