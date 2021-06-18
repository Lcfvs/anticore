export function all (selector, target = document) {
  return [...target.querySelectorAll(selector)]
}

export function one (selector, target = document) {
  return target.querySelector(selector)
}
