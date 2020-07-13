'use strict';

(function () {

  var removeChildren = function (container) {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  };

  window.domUtil = {
    removeChildren: removeChildren
  };

})();
