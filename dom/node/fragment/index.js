import { isCollection } from '../../info/isCollection'
import { wrap } from '../../tree/wrap'
import { wrapAll } from '../../tree/wrapAll'
import { document } from '../document'

export function fragment (contents) {
  let node = document().createDocumentFragment()

  if (!contents) {
    return node
  }

  if (isCollection(contents)) {
    return wrapAll(contents, node)
  }

  return wrap(contents)
}
