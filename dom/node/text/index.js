import { document } from '../document'

export function text (data) {
  return document().createTextNode(data)
}