void function (global) {
  'use strict';

  let
  anticore = global.anticore,
  $ = anticore.utils.$;

  function changeCurrent(event) {
    let
    element = event.target;

    $('.current', element.parentNode.parentNode).classList.remove('current');
    element.classList.add('current');
  }

  anticore.on('nav a', function(element, next) {
    element.addEventListener('click', changeCurrent);

    next();
  });
}(this);