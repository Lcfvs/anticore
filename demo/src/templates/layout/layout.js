import { load } from '../../lib/dom.js'
import * as ping from '../sse/ping/ping.js'

export const template = load(import.meta, 'template.html', {
  ping: ping.template,
  view: null
})
