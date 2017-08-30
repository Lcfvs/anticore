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
  })
  .on('.message', function(element, next, loaded) {
    if (!loaded) {
      return next();
    }

    let
    main = $('main#messages');

    main.appendChild(element);

    setTimeout(next, 300);
  })
  .defaults()
  .populate();
}(this);