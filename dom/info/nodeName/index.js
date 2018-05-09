import { toLowerCase } from '../../../primitive/string/toLowerCase'

export function nodeName (node) {
  if (!node) {
    return null
  }

  return toLowerCase(node.nodeName)
}
