import { global } from '../../global'
import { create } from '../../primitive/object/create'
import { call } from './.call'

const window = global(),
  events = create(),
  listen = window.Element.prototype.addEventListener

events.blur = ['blur', 'touchcancel', 'touchleave']
events.blur.listener = function (listener, event) {
  return listener.call(this, event)
}

events.click = ['click', 'touchend']
events.click.listener = function (listener, event) {
  if (!event.touches || event.touches.length === 1) {
    return listener.call(this, event)
  }
}

events.focus = ['focus', 'touchstart']
events.focus.listener = events.blur.listener

export function callEach (method, event, element, listener, useCapture) {
  let realListener = listener,
    names,
    key = 0,
    length

  if (event in events) {
    names = events[event]
    length = names.length

    if (method === listen) {
      realListener = names.listener.bind(element, realListener)
    }

    for (key; key < length; key += 1) {
      call(method, names[key], element, realListener, useCapture)
    }

    return realListener
  }

  call(method, event, element, realListener, useCapture)

  return realListener
}
