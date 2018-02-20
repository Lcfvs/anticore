import {isBoolean} from '../../../primitive/boolean/isBoolean';
import {isNumber} from '../../../primitive/number/isNumber';
import {isString} from '../../../primitive/string/isString';
import {text} from '../../node/text';
import {current} from '../current';

export function insert(node) {
  let
  selection = current(),
  range = selection.getRangeAt(0);

  if (isString(node) || isNumber(node) || isBoolean(node)) {
    node = text(node);
  }

  range.deleteContents();
  range.insertNode(node);
  selection.collapseToEnd();

  return selection;
}