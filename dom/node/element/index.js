import { document } from '../document'

export function element (tag) {
  return document().createElement(tag)
}