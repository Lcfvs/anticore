void function (global) {
  'use strict';

  let
  anticore = global.anticore,
  $ = anticore.utils.$;

  anticore.on('.mainSection', function(element, next, loaded) {
    if (!loaded) {
      return next();
    }

    let mainSection = $('.mainSection');

    mainSection.parentNode.replaceChild(element, mainSection);

    next();
  });

  anticore.on('.mainForm', function(element, next) {
    let
    mainSection = $('.mainSection');
    let mainForm = $('.mainForm', mainSection);

    if (mainForm) {
      mainSection.replaceChild(element, mainForm);
    } else {
      mainSection.appendChild(element);
    }

    next();
  });

  anticore.defaults();
  anticore.populate(document);
}(this);