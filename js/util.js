'use strict';

(function () {

  var Keys = {
    ENTER: {
      keyName: 'Enter'
    },
    ESCAPE: {
      keyName: 'Escape'
    }
  };

  var getRandomInt = function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  var getRandomFromArray = function (arr) {
    return arr[getRandomInt(0, arr.length - 1)];
  };

  var getRandomArray = function (arr) {
    var randomArray = [];

    for (var i = 0; i < getRandomInt(1, arr.length); i++) {
      randomArray.push(arr[i]);
    }

    return randomArray;
  };

  var isEscEvent = function (evt, action) {
    if (evt.keyCode === Keys.ESCAPE.keyCode) {
      evt.preventDefault();
      action();
    }
  };

  var isEnterEvent = function (evt, action) {
    if (evt.keyCode === Keys.ENTER.keyCode) {
      action();
    }
  };

  window.util = {
    getRandomInt: getRandomInt,
    getRandomArray: getRandomArray,
    getRandomFromArray: getRandomFromArray,
    isEscEvent: isEscEvent,
    isEnterEvent: isEnterEvent
  };

})();
