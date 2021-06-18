import { serialize } from '../../lib/dom.js'
import * as fragment from '../../templates/fragment/fragment.js'
import * as layout from '../../templates/layout/layout.js'
import * as validation from '../../templates/validation/validation.js'
import fastify from '../fastify.js'

const { entries, fromEntries, values } = Object

const renderError = ([name, { message }]) => [
  name,
  {
    ...validation.error,
    name,
    message
  }
]

const renderErrors = errors => fromEntries(entries(errors).map(renderError))

const renderPage = (view, data, errors) => {
  return {
    ...layout.template,
    view: {
      ...view,
      data,
      validation: errors && {
        ...validation.template,
        errors: renderErrors(errors)
      }
    }
  }
}

const renderXHR = (view, data, errors) => {
  return errors
    ? {
      ...validation.template,
      errors: values(renderErrors(errors))
    }
    : {
      ...fragment.template,
      view: {
        ...view,
        data
      }
    }
}

fastify.decorateReply('view', function (view, {
  data,
  errors = null,
  code = errors ? 422 : 200
} = {}) {
  const template = this.xhr
    ? renderXHR(view, data, errors)
    : renderPage(view, data, errors)

  return this
    .status(code)
    .type('text/html; charset=utf-8')
    .send(serialize(template))
})

fastify.decorateReply('sse', function () {
  const { raw } = this

  raw.writeHead(200, {
    'Cache-Control': 'no-cache',
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive'
  })

  return (type, id, template, { ...data } = {}) => {
    raw.write(`id: ${id}\n`)
    raw.write(`type: ${type}\n`)
    raw.write(`data: ${serialize({ ...template, data })}\n\n`)
  }
})
