'use strict';

(function () {

  var PIN_QUANTITY = 5;

  var onSuccess = function (arr) {
    var offersArray = window.util.getShuffledArray(arr);
    offersArray = arr.slice(0, PIN_QUANTITY);

    window.map.mapPins.appendChild(window.pin.renderPins(offersArray));
    window.map.mapElement.appendChild(window.map.mapPins);
    window.map.mapElement.insertBefore(window.card.renderOffer(offersArray[0]),
        window.map.mapElement.querySelector('.map__filters-container'));
  };

  var onError = function (errorMessage) {
    var errorTemplate = document.querySelector('#error')
      .content
      .querySelector('.error');

    var errorParent = document.querySelector('main');
    var errorPopup = errorTemplate.cloneNode(true);
    var errorText = errorPopup.querySelector('.error__message');
    var errorClose = errorPopup.querySelector('.error__button');

    errorText.textContent = errorMessage;

    errorClose.addEventListener('click', function () {
      errorParent.removeChild(errorPopup);
    });

    errorParent.appendChild(errorPopup);
  };

  window.backend.load(onSuccess, onError);

  window.map.mapPinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.map.activateMap);
  });

})();
