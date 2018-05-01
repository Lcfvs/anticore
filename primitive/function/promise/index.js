import { curry } from '../curry'
import { demethodize } from '../demethodize'

const
  demethodizedCurry = demethodize(curry)

export function promise (fn, ...args) {
  return new Promise(demethodizedCurry(this, fn, ...args))
}