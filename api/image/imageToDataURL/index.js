import { blobToDataURL } from '../../blob/blobToDataURL'
import { imageToBlob } from '../imageToBlob'

export function imageToDataURL (options, img) {
  return imageToBlob(options, img).then(blobToDataURL)
}
