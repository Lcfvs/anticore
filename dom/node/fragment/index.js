import {document} from '../document';
import {isCollection} from '../../info/isCollection';
import {wrapAll} from '../../tree/wrapAll';
import {wrap} from '../../tree/wrap';

export function fragment(contents) {
  let
  node = document().createDocumentFragment();

  if (!contents) {
    return node;
  }

  if (isCollection(contents)) {
    return wrapAll(contents, node);
  }

  return wrap(contents);
}