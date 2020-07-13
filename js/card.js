'use strict';

(function () {

  var offerTemplate = document.querySelector('#card')
    .content
    .querySelector('.map__card');

  var renderText = function (element, data, text) {
    if (data) {
      element.textContent = text;
    } else {
      element.style.display = 'none';
    }
  };

  var renderFeatures = function (card) {

    var features = card.querySelector('.popup__features');
    window.domUtil.removeChildren(features);

    if (card.features) {
      for (var i = 0; i < card.features.length; i++) {
        var feature = document.createElement('li');
        feature.classList.add('popup__feature');
        feature.classList.add('popup__feature--' + card.features[i]);
        features.appendChild(feature);
      }
    } else {
      features.style.display = 'none';
    }

  };

  var renderPhotos = function (card) {

    var photos = card.querySelector('.popup__photos');
    window.domUtil.removeChildren(photos);

    if (card.photos) {
      for (var j = 0; j < card.photos.length; j++) {
        var photo = document.createElement('img');
        photo.classList.add('popup__photo');
        photo.width = 45;
        photo.height = 40;
        photo.alt = 'Фотография жилья';
        photo.src = card.photos[j];
        photos.appendChild(photo);
      }
    } else {
      photos.style.display = 'none';
    }

  };

  var renderOffer = function (obj) {
    var offer = offerTemplate.cloneNode(true);

    renderFeatures(offer);
    renderPhotos(offer);

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

  window.card = {
    renderOffer: renderOffer
  };

})();
