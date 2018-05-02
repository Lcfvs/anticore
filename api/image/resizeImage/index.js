import { element } from '../../../dom/node/element'
import { curry } from '../../../primitive/function/curry'
import { promise } from '../../../primitive/function/promise'
import { create } from '../../../primitive/object/create'
import { canvasToImage } from '../../canvas/canvasToImage'

const min = Math.min
const max = Math.max

export function resizeImage (options, img) {
  options = parse(img.naturalWidth, img.naturalHeight, options)

  return promise(toCanvas, options, img).then(curry(canvasToImage, options))
}

function toCanvas (options, img, resolve) {
  const canvas = element('canvas')

  canvas.width = options.width
  canvas.height = options.height
  draw(options, img, canvas)

  resolve(canvas)
}

function draw (options, img, canvas) {
  const context = canvas.getContext('2d')

  context.fillStyle = 'transparent'
  context.fillRect(0, 0, options.width, options.height)
  context.save()
  context.drawImage(img, 0, 0, img.width, img.height, 0, 0, options.width,
    options.height)
}

function parse (width, height, options) {
  const result = create()
  const ratio = width / height

  result.natural = normalize(width, height, ratio)
  result.max = normalize(options.maxWidth, options.maxHeight, ratio, Infinity)
  result.min = normalize(options.minWidth, options.minHeight, ratio, 0)
  result.fixed = normalize(options.width, options.height, ratio, Infinity)

  minMax('width', result)
  minMax('height', result)

  return result
}

function normalize (width, height, ratio, defaultValue) {
  const config = create()

  config.width = width || defaultValue
  config.height = height || defaultValue

  if (width && height) {
    if (height * ratio > width) {
      config.height = width / ratio
    } else {
      config.width = height * ratio
    }
  } else if (width) {
    config.height = width / ratio
  } else if (height) {
    config.width = height * ratio
  }

  return config
}

function minMax (key, config) {
  config[key] = ~~min(config.max[key],
    max(config.fixed[key], config.min[key])) ||
    config.natural[key]
}
