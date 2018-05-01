import { create } from '../../../primitive/object/create'
import { current } from '../current'

export const anchor = create()

anchor.node = function () {
  return current().anchorNode
}

anchor.offset = function () {
  return current().anchorOffset
}
