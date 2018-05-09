import { toUpperCase } from '../toUpperCase'

function format (value) {
  return toUpperCase(value).replace('-', '')
}

export function dashToCamel (value) {
  return value.replace(/(-[a-z])/g, format)
}
