void function (global) {
  'use strict';

  let
  anticore = global.anticore,
  $ = anticore.utils.$;

  anticore
  .on('#notificationCount', function(element, next) {
    let
    notificationCount = $('#notificationCount');

    notificationCount.parentNode.replaceChild(element, notificationCount);

    next();
  });
}(this);