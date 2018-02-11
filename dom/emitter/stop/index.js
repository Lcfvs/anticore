export function stop(event, immediate) {
  if (immediate) {
    event.stopImmediatePropagation();
  } else {
    event.stopPropagation();
  }

  return event;
}