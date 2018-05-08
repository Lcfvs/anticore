import { document } from '../../node/document'

export function one (selector, refNode) {
  return (refNode || document()).querySelector(selector)
}
