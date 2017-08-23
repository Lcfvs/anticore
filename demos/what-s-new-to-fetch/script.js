void function (global) {
  'use strict';

  let
  anticore = global.anticore,
  $ = anticore.utils.$;

  anticore
  .on('section[id]', function(element, next) {
    let section = $('#' + element.id);
    section.parentNode.replaceChild(element, section);

    next();
  })
  .defaults()
  .populate();
}(this);