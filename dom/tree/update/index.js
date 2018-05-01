import { forEach } from '../../../primitive/array/forEach'
import { isObject } from '../../../primitive/object/isObject'
import { keys } from '../../../primitive/object/keys'
import { on } from '../../emitter/on'
import { append } from '../append'
import { attr } from '../attr'
import { before } from '../before'
import { data } from '../data'
import { style } from '../style'
import { text } from '../text'

export function update (element, config) {
  if (isObject(config)) {
    forEach(keys(config), function (name) {
      let
        value = config[name]

      if (name.substr(0, 2) === 'on') {
        on(name.substr(2).toLowerCase(), element, value)
      } else if (name === 'style' && isObject(value)) {
        forEach(keys(value), function (name) {
          style(element, name, value[name])
        })
      } else if (name === 'dataset' && isObject(value)) {
        forEach(keys(value), function (name) {
          data(element, name, value[name])
        })
      } else if (name === 'text') {
        text(element, value)
      } else if (name === 'parent') {
        append(element, value)
      } else if (name === 'next') {
        before(element, value)
      } else {
        attr(element, name, value)
      }
    })
  }

  return element
}
