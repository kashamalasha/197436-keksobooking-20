'use strict';

(function () {

  var MOCK_QUANTITY = 8;
  var offersArray = window.data.generateMockPins(MOCK_QUANTITY);

  window.map.mapPins.appendChild(window.pin.renderPins(offersArray));
  window.map.mapElement.appendChild(window.map.mapPins);
  window.map.mapElement.insertBefore(window.card.renderOffer(offersArray[0]),
      window.map.mapElement.querySelector('.map__filters-container'));

  window.map.mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();
      window.map.activateMap();
      window.form.setMainPinAddress();
    }
  });

  window.map.mapPinMain.addEventListener('keydown', function (evt) {
    window.util.isEnterEvent(evt, window.map.activateMap);
  });

})();
