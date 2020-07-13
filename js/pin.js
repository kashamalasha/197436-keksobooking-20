'use strict';

(function () {

  var PIN_ELEMENT = {
    W: 50,
    H: 70
  };

  var pinTemplate = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var renderPin = function (obj) {
    var pin = pinTemplate.cloneNode(true);
    var pinImage = pin.querySelector('img');

    pin.style.left = (obj.location.x - (PIN_ELEMENT.W / 2)) + 'px';
    pin.style.top = (obj.location.y - PIN_ELEMENT.H) + 'px';

    pinImage.src = obj.author.avatar;
    pinImage.alt = obj.offer.title;

    return pin;
  };

  var renderPins = function (arr) {
    var fragment = document.createDocumentFragment();

    for (var j = 0; j < arr.length; j++) {
      fragment.appendChild(renderPin(arr[j]));
    }

    return fragment;
  };

  window.pin = {
    renderPins: renderPins
  };

})();
