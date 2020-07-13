'use strict';

(function () {

  var mapElement = document.querySelector('.map');
  var mapPins = mapElement.querySelector('.map__pins');
  var mapPinMain = mapPins.querySelector('.map__pin--main');

  var activateMap = function () {
    mapElement.classList.remove('map--faded');
    window.form.adform.classList.remove('ad-form--disabled');
  };

  window.map = {
    mapElement: mapElement,
    mapPins: mapPins,
    mapPinMain: mapPinMain,
    activateMap: activateMap
  };

})();
