(function() {
  var ChronosDOM, ChronosDom, Interval, TimeParser;

  Interval = require('./interval');

  TimeParser = require('./time_string');

  ChronosDom = (function() {

    function ChronosDom() {}

    ChronosDom.prototype.element = function(domId) {
      var domObject, domSearcher;
      if (typeof domId === 'string') {
        domSearcher = domId[0] === '#' ? domId.substring(1, domId.length) : domId;
        domObject = document.getElementById(domSearcher);
      } else {
        domObject = domId;
      }
      if (domObject == null) throw new Error("Element " + domId + " not found");
      return domObject;
    };

    ChronosDom.prototype.setText = function(element, text) {
      if (typeof element.text === 'function') {
        return element.text(text);
      } else {
        return element.innerHTML = text;
      }
    };

    ChronosDom.prototype.live = function(domId, callback, context, interval) {
      var domObject,
        _this = this;
      if (interval == null) interval = '5 seconds';
      domObject = this.element(domId);
      this.setText(domObject, callback(context));
      return new Interval({
        timeString: interval
      })["do"](function() {
        return _this.setText(domObject, callback(context));
      });
    };

    return ChronosDom;

  })();

  if (typeof module !== "undefined" && module !== null) {
    module.exports = new ChronosDom;
  } else {
    ChronosDOM = new ChronosDom;
  }

}).call(this);
