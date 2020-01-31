import EventSource from 'anticore-core/apis/EventSource/index.js'
import onError from 'anticore-dom/emitter/onError.js'
import onMessage from 'anticore-dom/emitter/onMessage.js'
import fromString from 'anticore-dom/tree/fromString.js'
import { trigger, debug } from './index.js'

/**
 * Listens an event source
 * turns the contents to DOM, except if a reviver is provided
 * @param {string} url
 * @param {object} config
 * @param {function} reviver
 * @returns {EventSource} source
 */
export default function sse (url, config, reviver = fromString) {
  const source = new EventSource(url, config)

  onMessage(source, event => trigger(reviver(event.data), url))
  onError(source, debug.onError)

  return source
}
