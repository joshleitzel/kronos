(function() {

  if (typeof define !== 'function') { var define = require('amdefine')(module); };

  var __slice = Array.prototype.slice;

  define(['./interval', './timeout', './time_parser'], function(Interval, Timeout, TimeParser) {
    return {
      "in": function(relativeTimeString) {
        return new Timeout({
          timeString: relativeTimeString
        });
      },
      every: function(relativeTimeString) {
        return new Interval({
          timeString: relativeTimeString
        });
      },
      until: function(condition) {
        return new Interval({
          condition: condition
        });
      },
      unless: function(condition) {
        return new Timeout({
          condition: condition
        });
      },
      "new": function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return new TimeParser(args);
      }
    };
  });

}).call(this);
