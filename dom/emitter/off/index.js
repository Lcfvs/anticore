import {callEach} from '../.callEach';
import {global} from '../../../global';

/**
 * Forgets a listener of an event on an element (touch or not)
 * @param {String} event
 * @param {Element} element
 * @param {Function} listener
 * @param {Boolean} useCapture
 * @returns {Function} listener
 */
export const off = callEach.bind(null, global().Element.prototype.removeEventListener);