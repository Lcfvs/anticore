function format (value) {
  return value.toUpperCase().replace('-', '')
}

export function dashToCamel (value) {
  return value.replace(/(-[a-z])/g, format)
}