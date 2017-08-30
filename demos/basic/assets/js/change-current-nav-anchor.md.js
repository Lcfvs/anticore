void function (global) {
  'use strict';

  let
  anticore = global.anticore,
  $ = anticore.utils.$;

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
}(this);