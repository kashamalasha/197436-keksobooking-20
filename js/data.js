'use strict';

(function () {

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

  var generateMockPins = function (qty) {
    var mapWidth = window.map.mapPins.clientWidth;
    var arr = [];

    for (var i = 0; i < qty; i++) {
      var offerLocation = {
        x: window.util.getRandomInt(0, mapWidth),
        y: window.util.getRandomInt(130, 630)
      };

      arr.push({
        author: {
          avatar: 'img/avatars/user0' + window.util.getRandomInt(1, 8) + '.png'
        },
        offer: {
          title: window.util.getRandomFromArray(MOCK_TITLES),
          address: offerLocation.x + ',' + offerLocation.y,
          price: window.util.getRandomInt(10, 1000) + '.00',
          type: window.util.getRandomFromArray(MOCK_TYPES),
          rooms: window.util.getRandomInt(1, 5),
          guests: window.util.getRandomInt(1, 10),
          checkin: window.util.getRandomFromArray(MOCK_HOURS),
          checkout: window.util.getRandomFromArray(MOCK_HOURS),
          features: window.util.getRandomArray(MOCK_FEATURES),
          description: window.util.getRandomFromArray(MOCK_DESCRIPTIONS),
          photos: window.util.getRandomArray(MOCK_PHOTOS)
        },
        location: offerLocation
      });
    }

    return arr;
  };

  var offersArray = generateMockPins(MOCK_QUANTITY);

  window.data = {
    offersArray: offersArray
  };

})();
