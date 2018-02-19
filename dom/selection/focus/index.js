import {create} from '../../../primitive/object/create';
import {current} from '../current';

export const focus = create();

focus.node = function () {
  return focus().focusNode;
};

focus.offset = function () {
  return current().focusOffset;
};