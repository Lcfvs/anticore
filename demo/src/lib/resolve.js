import path from 'path'
import { fileURLToPath } from 'url'

export default function resolve (url, ...segments) {
  return path.resolve(path.dirname(fileURLToPath(url)), ...segments)
}
