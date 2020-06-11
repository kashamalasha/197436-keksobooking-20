'use strict';

var MOCK = {
  QTY: 8,
  TITLES: ['Нора в горе', 'Нора под горой', 'Бунгало на болоте'],
  TYPES: ['palace', 'flat', 'house', 'bungalo'],
  HOURS: ['12:00', '13:00', '14:00'],
  FEATURES: ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  DESCRIPTIONS: [
    'Прекрасный вид на утренний рассвет',
    'Незабываемый закат на фоне Фудзияма',
    'Тихий уголок в самом сердце бушующего города'
  ],
  PHOTOS: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ]
};

var PIN_ELEMENT = {
  W: 50,
  H: 70
};

var MAP_ELEMENT = document.querySelector('.map');
var MAP_PINS = document.querySelector('.map__pins');
var PIN_TEMPLATE = document.querySelector('#pin')
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

var getMockAvatar = function () {
  return '0' + getRandomInt(1, 8);
};

var generateMockPins = function (qty) {
  var arr = [];

  for (var i = 0; i < qty; i++) {
    var mapWidth = MAP_PINS.clientWidth;

    var location = {
      x: getRandomInt(0, mapWidth),
      y: getRandomInt(130, 630)
    };

    arr.push({
      author: {
        avatar: 'img/avatars/user' + getMockAvatar() + '.png'
      },
      offer: {
        title: getRandomFromArray(MOCK.TITLES),
        address: location.x + ',' + location.y,
        price: getRandomInt(10, 1000) + '.00',
        type: getRandomFromArray(MOCK.TYPES),
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(1, 10),
        checkin: getRandomFromArray(MOCK.HOURS),
        checkout: getRandomFromArray(MOCK.HOURS),
        features: getRandomFromArray(MOCK.FEATURES),
        description: getRandomFromArray(MOCK.DESCRIPTIONS),
        photos: getRandomFromArray(MOCK.PHOTOS)
      },
      location: {
        x: location.x,
        y: location.y
      }
    });
  }

  return arr;
};


var renderPin = function (obj) {
  var pin = PIN_TEMPLATE.cloneNode(true);
  var pinImage = pin.children[0];

  pin.style.left = (obj.location.x - (PIN_ELEMENT.W / 2)) + 'px';
  pin.style.top = (obj.location.y - PIN_ELEMENT.H) + 'px';

  pinImage.src = obj.author.avatar;
  pinImage.alt = obj.offer.title;

  return pin;
};

var renderPins = function (parentElement) {
  var fragment = document.createDocumentFragment();
  var offersArray = generateMockPins(MOCK.QTY);

  for (var j = 0; j < offersArray.length; j++) {
    parentElement.appendChild(renderPin(offersArray[j]));
  }

  return fragment.appendChild(parentElement);
};

MAP_ELEMENT.appendChild(renderPins(MAP_PINS));
MAP_ELEMENT.classList.remove('map--faded');


