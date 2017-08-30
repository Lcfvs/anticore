void function (global) {
  'use strict';

  let
  anticore = global.anticore,
  $ = anticore.utils.$;

  anticore.on('main', function(element, next, loaded) {
    if (!loaded) {
      return next();
    }

    let
    main = $('main');

    main.parentNode.replaceChild(element, main);

    next();
  });
}(this);