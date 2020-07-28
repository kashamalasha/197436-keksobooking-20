'use strict';

(function () {

  var isFormActivated = false;

  window.map.mapPinMain.addEventListener('mousedown', function (evt) {
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var mapOffsetLeft = window.map.mapPins.offsetLeft + window.pin.PIN_ELEMENT.W / 2;
    var mapOffsetWidth = window.map.mapPins.offsetWidth - window.pin.PIN_ELEMENT.W / 2;

    var isDragged = false;

    evt.preventDefault();

    if (!isFormActivated) {
      window.map.activateMap();
      isFormActivated = true;
    }
    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      isDragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      if (moveEvt.clientY < 130 || moveEvt.clientY > 630) {
        shift.y = 0;
      }


      if (moveEvt.clientX < mapOffsetLeft || moveEvt.clientX > mapOffsetWidth) {
        shift.x = 0;
      }
      // console.log(moveEvt.clientX);

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      window.map.mapPinMain.style.top = (window.map.mapPinMain.offsetTop - shift.y) + 'px';
      window.map.mapPinMain.style.left = (window.map.mapPinMain.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);

      if (isDragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          window.map.mapPinMain.removeEventListener('click', onClickPreventDefault);
        };

        window.map.mapPinMain.addEventListener('click', onClickPreventDefault);
      }

      window.form.setMainPinAddress();
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
