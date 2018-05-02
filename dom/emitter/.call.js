export function call (method, event, element, listener, useCapture) {
  if ('on'.concat(event) in element) {
    method.call(element, event, listener, useCapture)
  }
}
