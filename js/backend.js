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

  var createRequest = function (method, url, onLoad, onError) {
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

    return xhr;
  };

  var load = function (onSuccess, onError) {
    var xhr = createRequest('GET', Url.LOAD, onSuccess, onError);
    xhr.send();
  };

  var save = function (data, onSuccess, onError) {
    var xhr = createRequest('POST', Url.SAVE, onSuccess, onError);
    xhr.send(data);
  };

  window.backend = {
    load: load,
    save: save
  };

})();
