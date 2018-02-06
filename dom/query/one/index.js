import {document} from '../../node/document';

export function one(selector, refNode) {
  refNode = (refNode || document());

  return selector === undefined ? refNode : refNode.querySelector(selector);
}