import { serialize, source } from '@lcf.vs/dom-engine/lib/backend.js'
import { readFileSync } from 'fs'
import resolve from './resolve.js'

export const load = ({ url }, name, { ...data } = {}) => ({
  [source]: readFileSync(resolve(url, name)).toString(),
  ...data
})

export { serialize }
