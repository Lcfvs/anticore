import { getTarget } from '../../../dom/emitter/getTarget'
import { onceError } from '../../../dom/emitter/once/onceError'
import { onceLoad } from '../../../dom/emitter/once/onceLoad'
import { global } from '../../../global'
import { promise } from '../../../primitive/function/promise'

const window = global()
const FileReader = window.FileReader

export function blobToText (blob) {
  return promise(read, blob).then(getTarget)
}

function read (blob, resolve, reject) {
  const reader = new FileReader()

  reader.readAsText(blob)
  onceLoad(reader, resolve)
  onceError(reader, reject)
}
