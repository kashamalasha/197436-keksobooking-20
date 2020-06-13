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

var Placement = {
  FLAT: {
    name: 'Квартира'
  },
  BUNGALO: {
    name: 'Бунгало'
  },
  HOUSE: {
    name: 'Дом'
  },
  PALACE: {
    name: 'Дворец'
  },
  fromId: function (id) {
    return this[id.toUpperCase()];
  }
};

var mapElement = document.querySelector('.map');
var mapPins = document.querySelector('.map__pins');

var pinTemplate = document.querySelector('#pin')
  .content
  .querySelector('.map__pin');

var offerTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

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

var removeChildren = function (container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

var renderText = function (element, data, text) {
  if (data) {
    element.textContent = text;
  } else {
    element.style.display = 'none';
  }
};

var renderOffer = function (obj) {
  var offer = offerTemplate.cloneNode(true);


  var features = offer.querySelector('.popup__features');
  removeChildren(features);

  if (obj.offer.features) {
    for (var i = 0; i < obj.offer.features.length; i++) {
      var feature = document.createElement('li');
      feature.classList.add('popup__feature');
      feature.classList.add('popup__feature--' + obj.offer.features[i]);
      features.appendChild(feature);
    }
  } else {
    features.style.display = 'none';
  }

  var photos = offer.querySelector('.popup__photos');
  removeChildren(photos);

  if (obj.offer.photos) {
    for (var j = 0; j < obj.offer.photos.length; j++) {
      var photo = document.createElement('img');
      photo.classList.add('popup__photo');
      photo.width = 45;
      photo.height = 40;
      photo.alt = 'Фотография жилья';
      photo.src = obj.offer.photos[j];
      photos.appendChild(photo);
    }
  } else {
    photos.style.display = 'none';
  }

  var avatar = offer.querySelector('.popup__avatar');

  if (obj.author.avatar) {
    avatar.src = obj.author.avatar;
  } else {
    avatar.style.display = 'none';
  }

  renderText(offer.querySelector('.popup__title'),
      obj.offer.title,
      obj.offer.title);

  renderText(offer.querySelector('.popup__text--address'),
      obj.offer.address,
      obj.offer.address);

  renderText(offer.querySelector('.popup__text--price'),
      obj.offer.price,
      obj.offer.price + '₽/ночь');

  renderText(offer.querySelector('.popup__type'),
      obj.offer.type,
      placement.fromId(obj.offer.type).name);

  renderText(offer.querySelector('.popup__text--capacity'),
      obj.offer.rooms && obj.offer.guests,
      obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей');

  renderText(offer.querySelector('.popup__text--time'),
      obj.offer.checkin && obj.offer.checkout,
      'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout);

  renderText(offer.querySelector('.popup__description'),
      obj.offer.description,
      obj.offer.description);

  return offer;
};

var offersArray = generateMockPins(MOCK_QUANTITY);

mapPins.appendChild(renderPins(offersArray));
mapElement.appendChild(mapPins);
mapElement.classList.remove('map--faded');

mapElement.insertBefore(renderOffer(offersArray[0]), mapElement.querySelector('.map__filters-container'));
