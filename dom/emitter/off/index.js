import { global } from '../../../global'
import { callEach } from '../.callEach'

const
  window = global();

/**
 * Forgets a listener of an event on an element (touch or not)
 * @param {String} event
 * @param {Element} element
 * @param {Function} listener
 * @param {Boolean} useCapture
 * @returns {Function} listener
 */
export const off = callEach.bind(null,
  window.Element.prototype.removeEventListener)