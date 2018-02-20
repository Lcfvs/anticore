export function curry(fn, ...args) {
  return fn.bind(this, ...args);
}