(function() {
  var Chronos, Interval, TimeParser, Timeout,
    __slice = Array.prototype.slice;

  Interval = require('./interval');

  Timeout = require('./timeout');

  TimeParser = require('./time_parser');

  Chronos = (function() {

    function Chronos() {}

    Chronos.prototype["in"] = function(relativeTimeString) {
      return new Timeout({
        timeString: relativeTimeString
      });
    };

    Chronos.prototype.every = function(relativeTimeString) {
      return new Interval({
        timeString: relativeTimeString
      });
    };

    Chronos.prototype.until = function(condition) {
      return new Interval({
        condition: condition
      });
    };

    Chronos.prototype.unless = function(condition) {
      return new Timeout({
        condition: condition
      });
    };

    Chronos.prototype["new"] = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return new TimeParser(args);
    };

    Chronos.prototype.now = function() {
      return new TimeParser();
    };

    return Chronos;

  })();

  if (typeof module !== "undefined" && module !== null) {
    module.exports = new Chronos;
  } else {
    Chronos = new Chronos;
  }

}).call(this);
