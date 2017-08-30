void function (global) {
  'use strict';

  let
  anticore = global.anticore,
  // refer to readme #utils
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

  anticore.on('nav a', function () {
    function changeCurrent(event) {
      let
      element = event.target;

      $('.current', element.parentNode.parentNode).classList.remove('current');
      element.classList.add('current');
    }

    return function(element, next) {
      element.addEventListener('click', changeCurrent);

      next();
    };
  }());

  anticore.defaults();
  anticore.populate();
}(this);