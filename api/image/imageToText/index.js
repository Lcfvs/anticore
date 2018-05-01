import { blobToText } from '../../blob/blobToText'
import { imageToBlob } from '../imageToBlob'

export function imageToText (options, img) {
  return imageToBlob(options, img).then(blobToText)
}