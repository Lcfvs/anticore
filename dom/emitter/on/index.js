import { global } from '../../../global'
import { callEach } from '../.callEach'

const
  window = global()

/**
 * Listens an event on an element (touch or not)
 * @param {String} event
 * @param {Element} element
 * @param {Function} listener
 * @param {Boolean} useCapture
 * @returns {Function} realListener
 */
export const on = callEach.bind(null,
  window.Element.prototype.addEventListener)
