import {current} from '../current';
import {document} from '../../node/document';

export function select(node, begin, end) {
  let
  range = document().createRange(),
  selection = current();

  range.selectNodeContents(node);

  if (Number.isInteger(begin)) {
    range.setStart(node, begin);
  }

  if (Number.isInteger(end)) {
    range.setEnd(node, end);
  }

  selection.removeAllRanges();
  selection.addRange(range);

  if (!Number.isInteger(begin)) {
    selection.collapseToEnd();
  }

  if (!Number.isInteger(end)) {
    selection.collapseToStart();
  }

  return node;
}