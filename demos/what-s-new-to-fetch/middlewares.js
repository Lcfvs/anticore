void function (global) {
  'use strict';

  let
  anticore = global.anticore,
  $ = anticore.utils.$;

  anticore
  .on('section[id]', function(element, next, loaded) {
    if (!loaded) {
      return next();
    }

    let section = $('#' + element.id);
    section.parentNode.replaceChild(element, section);

    setTimeout(next, 300);
  })
  .defaults()
  .populate();
}(this);