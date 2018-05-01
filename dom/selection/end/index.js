import { lastOrSelf } from '../../query/lastOrSelf'
import { text } from '../../tree/text'
import { select } from '../select'

export function end (node) {
  let
    last = lastOrSelf(node)

  select(last, text(last).length)

  return last
}
