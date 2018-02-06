import {callEach} from '../.callEach';
import {global} from '../../../global';

/**
 * Listens an event on an element (touch or not)
 * @param {String} event
 * @param {Element} element
 * @param {Function} listener
 * @param {Boolean} useCapture
 * @returns {Function} realListener
 */
export const on = callEach.bind(null, global().Element.prototype.addEventListener);