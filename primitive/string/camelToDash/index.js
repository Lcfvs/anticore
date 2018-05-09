import { toLowerCase } from '../toLowerCase'

function format (value) {
  return '-'.concat(toLowerCase(value))
}

export function camelToDash (value) {
  return value.replace(/([A-Z])/g, format)
}
