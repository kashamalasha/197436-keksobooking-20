'use strict';

(function () {

  var Placement = {
    FLAT: {
      name: 'Квартира',
      minPrice: 1000
    },
    BUNGALO: {
      name: 'Бунгало',
      minPrice: 0
    },
    HOUSE: {
      name: 'Дом',
      minPrice: 5000
    },
    PALACE: {
      name: 'Дворец',
      minPrice: 10000
    },
    fromId: function (id) {
      return this[id.toUpperCase()];
    }
  };

  var roomCapacity = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };

  var MAIN_PIN_ELEMENT = {
    W: 65,
    H: 87
  };

  var adform = document.querySelector('.ad-form');

  var form = {
    title: adform.querySelector('#title'),
    placement: adform.querySelector('#type'),
    price: adform.querySelector('#price'),
    timeIn: adform.querySelector('#timein'),
    timeOut: adform.querySelector('#timeout'),
    roomNumber: adform.querySelector('#room_number'),
    capacity: adform.querySelector('#capacity')
  };

  var setMainPinAddress = function () {
    var address = {
      X: Math.floor(parseInt(window.map.mapPinMain.style.left, 10) + (MAIN_PIN_ELEMENT.W / 2)),
      Y: Math.floor(parseInt(window.map.mapPinMain.style.top, 10) + (MAIN_PIN_ELEMENT.H))
    };

    adform.querySelector('#address').value = address.X + ', ' + address.Y;
  };

  var disableOptions = function (options) {
    for (var i = 0; i < options.length; i++) {
      options[i].disabled = true;
      options[i].selected = false;
    }
  };

  var enableOptions = function (values, options) {
    for (var i = 0; i < options.length; i++) {
      for (var j = 0; j < values.length; j++) {
        if (options[i].value === values[j]) {
          options[i].disabled = false;
          options[i].selected = true;
        }
      }
    }
  };

  var setMaxCapacity = function (roomNumber) {
    var options = form.capacity.getElementsByTagName('option');

    disableOptions(options);
    enableOptions(roomCapacity[roomNumber], options);
  };

  var setMinPrice = function (type, ctx) {
    ctx.price.min = Placement.fromId(type).minPrice;
  };

  form.title.addEventListener('invalid', function () {
    if (form.title.validity.tooShort) {
      form.title.setCustomValidity('Минимальная длина - 30 символов');
    } else if (form.title.validity.tooLong) {
      form.title.setCustomValidity('Максимальная длина - 100 символов');
    } else if (form.title.validity.valueMissing) {
      form.title.setCustomValidity('Обязательное поле');
    } else {
      form.title.setCustomValidity('');
    }
  });

  form.timeIn.addEventListener('change', function () {
    form.timeOut.value = form.timeIn.options[form.timeIn.selectedIndex].value;
  });

  form.timeOut.addEventListener('change', function () {
    form.timeIn.value = form.timeOut.options[form.timeOut.selectedIndex].value;
  });

  form.roomNumber.addEventListener('change', function () {
    setMaxCapacity(form.roomNumber.options[form.roomNumber.selectedIndex].value);
  });

  form.placement.addEventListener('change', function () {
    setMinPrice(form.placement.options[form.placement.selectedIndex].value, form);
  });

  form.timeOut.value = form.timeIn.options[form.timeIn.selectedIndex].value;
  setMaxCapacity(form.roomNumber.options[form.roomNumber.selectedIndex].value);
  setMinPrice(form.placement.options[form.placement.selectedIndex].value, form);

  window.form = {
    Placement: Placement,
    adform: adform,
    setMainPinAddress: setMainPinAddress
  };

})();
