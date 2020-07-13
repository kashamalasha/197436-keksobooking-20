'use strict';

(function () {

  var offerTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

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
        window.form.Placement.fromId(obj.offer.type).name);

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


  window.map.mapElement.insertBefore(renderOffer(window.data.offersArray[0]), window.map.mapElement.querySelector('.map__filters-container'));
})();
