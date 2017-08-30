void function (global) {
  'use strict';

  let
  anticore = global.anticore,
  $ = anticore.utils.$;

  anticore
  .on('.message', function(element, next, loaded) {
    if (!loaded) {
      return next();
    }

    let
    main = $('main#messages');

    main.appendChild(element);

    setTimeout(next, 300);
  });
}(this);