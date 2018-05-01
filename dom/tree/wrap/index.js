import { before } from '../before'

export function wrap (node, wrapper) {
  before(node, null, wrapper)

  return wrapper
}
