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

  var renderFeatures = function (card, offer) {

    var features = card.querySelector('.popup__features');
    window.domUtil.removeChildren(features);

    if (offer.features) {
      for (var i = 0; i < offer.features.length; i++) {
        var feature = document.createElement('li');
        feature.classList.add('popup__feature');
        feature.classList.add('popup__feature--' + offer.features[i]);
        features.appendChild(feature);
      }
    } else {
      features.style.display = 'none';
    }

  };

  var renderPhotos = function (card, offer) {

    var photos = card.querySelector('.popup__photos');
    window.domUtil.removeChildren(photos);

    if (offer.photos) {
      for (var i = 0; i < offer.photos.length; i++) {
        var photo = document.createElement('img');
        photo.classList.add('popup__photo');
        photo.width = 45;
        photo.height = 40;
        photo.alt = 'Фотография жилья';
        photo.src = offer.photos[i];
        photos.appendChild(photo);
      }
    } else {
      photos.style.display = 'none';
    }

  };

  var renderOffer = function (obj) {
    var card = offerTemplate.cloneNode(true);

    renderFeatures(card, obj.offer);
    renderPhotos(card, obj.offer);

    var avatar = card.querySelector('.popup__avatar');

    if (obj.author.avatar) {
      avatar.src = obj.author.avatar;
    } else {
      avatar.style.display = 'none';
    }

    renderText(card.querySelector('.popup__title'),
        obj.offer.title,
        obj.offer.title);

    renderText(card.querySelector('.popup__text--address'),
        obj.offer.address,
        obj.offer.address);

    renderText(card.querySelector('.popup__text--price'),
        obj.offer.price,
        obj.offer.price + '₽/ночь');

    renderText(card.querySelector('.popup__type'),
        obj.offer.type,
        window.form.Placement.fromId(obj.offer.type).name);

    renderText(card.querySelector('.popup__text--capacity'),
        obj.offer.rooms && obj.offer.guests,
        obj.offer.rooms + ' комнаты для ' + obj.offer.guests + ' гостей');

    renderText(card.querySelector('.popup__text--time'),
        obj.offer.checkin && obj.offer.checkout,
        'Заезд после ' + obj.offer.checkin + ', выезд до ' + obj.offer.checkout);

    renderText(card.querySelector('.popup__description'),
        obj.offer.description,
        obj.offer.description);

    return card;
  };

  window.card = {
    renderOffer: renderOffer
  };

})();
