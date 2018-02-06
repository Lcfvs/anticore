export function nodeName(node) {
  if (!node) {
    return null;
  }

  return node.nodeName.toLowerCase();
}