'use strict';

var MOCK_QUANTITY = 8;
var MOCK_TITLES = ['Нора в горе', 'Нора под горой', 'Бунгало на болоте'];
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

var mapElement = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');
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
        address: location.x + ',' + location.y,
        price: getRandomInt(10, 1000) + '.00',
        type: getRandomFromArray(MOCK_TYPES),
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(1, 10),
        checkin: getRandomFromArray(MOCK_HOURS),
        checkout: getRandomFromArray(MOCK_HOURS),
        features: getRandomFromArray(MOCK_FEATURES),
        description: getRandomFromArray(MOCK_DESCRIPTIONS),
        photos: getRandomFromArray(MOCK_PHOTOS)
      },
      location: offerLocation
    });
  }

  return arr;
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

  for (var j = 0; j < offersArray.length; j++) {
    fragment.appendChild(renderPin(arr[j]));
  }

  return fragment;
};

var offersArray = generateMockPins(MOCK_QUANTITY);

mapPins.appendChild(renderPins(offersArray));
mapElement.appendChild(mapPins);
mapElement.classList.remove('map--faded');


