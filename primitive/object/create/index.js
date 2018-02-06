export const create = function(method, prototype, descriptors) {
  return method(prototype || null, descriptors);
}.bind(null, Object.create);