import {global} from '../../../global';

const
window = global(),
HTMLCollection = window.HTMLCollection,
NodeList = window.NodeList;

export function isCollection(contents) {
  return contents instanceof HTMLCollection
  || contents instanceof NodeList;
}