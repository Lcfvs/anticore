function format(value){
  return '-'.concat(value.toLowerCase());
}

export function camelToDash(value) {
  return value.replace(/([A-Z])/g, format);
}