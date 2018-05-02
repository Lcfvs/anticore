import { document } from '../../node/document'

export function all (selector, refNode) {
  return ( refNode || document() ).querySelectorAll(selector)
}
