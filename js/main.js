'use strict';

var MOCK_QUANTITY = 8;
var MOCK_TITLES = ['Нора в горе', 'Нора под горой', 'Нора на горе'];
var MOCK_TYPES = ['palace', 'flat', 'house', 'bungalo'];
var MOCK_HOURS = ['12:00', '13:00', '14:00'];
var MOCK_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var MOCK_DESCRIPTIONS = [
  'Прекрасный вид на утренний рассвет',
  'Незабываемый закат на фоне Фудзияма',
  'Тихий уголок в самом сердце бушующего города'
];
var MOCK_PHOTOS = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
];

var PIN_ELEMENT = {
  W: 50,
  H: 70
};

var MAIN_PIN_ELEMENT = {
  W: 65,
  H: 87
};

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

var Buttons = {
  ENTER: {
    name: 'Enter',
    charCode: 13
  },
  ESCAPE: {
    name: 'Escape',
    charCode: 27
  }
};

var roomCapacity = {
  1: ['1'],
  2: ['1', '2'],
  3: ['1', '2', '3'],
  100: ['0']
};

var mapElement = document.querySelector('.map');
var mapPins = mapElement.querySelector('.map__pins');
var mapPinMain = mapPins.querySelector('.map__pin--main');
var adform = document.querySelector('.ad-form');

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

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

var generateMockPins = function (qty) {
  var mapWidth = mapPins.clientWidth;
  var arr = [];

  for (var i = 0; i < qty; i++) {
    var offerLocation = {
      x: getRandomInt(0, mapWidth),
      y: getRandomInt(130, 630)
    };

    arr.push({
      author: {
        avatar: 'img/avatars/user0' + getRandomInt(1, 8) + '.png'
      },
      offer: {
        title: getRandomFromArray(MOCK_TITLES),
        address: offerLocation.x + ',' + offerLocation.y,
        price: getRandomInt(10, 1000) + '.00',
        type: getRandomFromArray(MOCK_TYPES),
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(1, 10),
        checkin: getRandomFromArray(MOCK_HOURS),
        checkout: getRandomFromArray(MOCK_HOURS),
        features: getRandomArray(MOCK_FEATURES),
        description: getRandomFromArray(MOCK_DESCRIPTIONS),
        photos: getRandomArray(MOCK_PHOTOS)
      },
      location: offerLocation
    });
  }

  return arr;
};

var activateMap = function () {
  mapElement.classList.remove('map--faded');
  adform.classList.remove('ad-form--disabled');
};

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

var offersArray = generateMockPins(MOCK_QUANTITY);

mapPins.appendChild(renderPins(offersArray));
mapElement.appendChild(mapPins);

mapPinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    evt.preventDefault();
    activateMap();
    setMainPinAddress();
  }
});

mapPinMain.addEventListener('keydown', function (evt) {
  if (evt.key === Buttons.ENTER.name) {
    activateMap();
  }
});

var setMainPinAddress = function () {
  var address = {
    X: Math.floor(parseInt(mapPinMain.style.left, 10) + (MAIN_PIN_ELEMENT.W / 2)),
    Y: Math.floor(parseInt(mapPinMain.style.top, 10) + (MAIN_PIN_ELEMENT.H))
  };

  adform.querySelector('#address').value = address.X + ', ' + address.Y;
};

var form = {
  title: adform.querySelector('#title'),
  placement: adform.querySelector('#type'),
  price: adform.querySelector('#price'),
  timeIn: adform.querySelector('#timein'),
  timeOut: adform.querySelector('#timeout'),
  roomNumber: adform.querySelector('#room_number'),
  capacity: adform.querySelector('#capacity')
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
