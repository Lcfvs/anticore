import { indexOf } from '../../primitive/array/indexOf'

export function matches (event, ctrl, alt, shift, keys, code) {
  return event.ctrlKey === ctrl &&
    event.altKey === alt &&
    event.shiftKey === shift &&
    (indexOf(keys, event.key) > 1 ||
      event.which === code ||
      event.keyCode === code)
}
