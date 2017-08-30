void function (global) {
  'use strict';

  let
  anticore = global.anticore,
  $ = anticore.utils.$;

  anticore
  .on('.error[data-for]', function(element, next) {
    let
    target = element.dataset.for,
    field = $(target);

    field.parentNode.insertBefore(element, field);

    next();
  })
  .defaults()
  .populate();
}(this);