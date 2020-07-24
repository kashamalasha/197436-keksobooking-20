'use strict';

(function () {

  var TIMEOUT = 10000;

  var StatusCode = {
    OK: 200
  };

  var Url = {
    SAVE: '',
    LOAD: 'https://javascript.pages.academy/keksobooking/data'
  };

  var createRequest = function (method, url, data, onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      switch (xhr.status) {
        case StatusCode.OK:
          onLoad(xhr.response);
          break;
        default:
          onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
          break;
      }
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Таймаут: ' + xhr.timeout + 'мс.');
    });

    xhr.timeout = TIMEOUT;
    xhr.open(method, url);
    xhr.send(data);
  };

  var load = function (onSuccess, onError) {
    createRequest('GET', Url.LOAD, null, onSuccess, onError);
  };

  var save = function (data, onSuccess, onError) {
    createRequest('POST', Url.SAVE, data, onSuccess, onError);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
