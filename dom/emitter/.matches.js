import { indexOf } from '../../primitive/array/indexOf'

export function matches (e, ctrl, alt, shift, keys, code) {
  if (e.ctrlKey !== ctrl || e.altKey !== alt || e.shiftKey !== shift) {
    return false
  }

  return !keys ||
    indexOf(keys, e.key) > -1 ||
    e.which === code ||
    e.keyCode === code
}
