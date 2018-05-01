import { off } from '../off'
import { on } from '../on'

/**
 * Listens once an event on an element (touch or not)
 * @param {String} event
 * @param {Element} element
 * @param {Function} listener
 * @param {Boolean} useCapture
 * @returns {Function} listener
 */
export function once (event, element, listener, useCapture) {
  let
    realListener = on(event, element, function (event) {
      off(event.type, element, realListener, useCapture)

      return listener.call(this, event)
    }, useCapture)

  return realListener
}
