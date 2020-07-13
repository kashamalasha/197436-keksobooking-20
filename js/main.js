'use strict';

(function () {

  window.map.mapPins.appendChild(window.map.renderPins(window.data.offersArray));
  window.map.mapElement.appendChild(window.map.mapPins);

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
