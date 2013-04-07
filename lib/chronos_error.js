(function() {

  if (typeof define !== 'function') { var define = require('amdefine')(module); };

  var __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  define(function() {
    var ChronosError;
    return ChronosError = (function() {

      __extends(ChronosError, Error);

      ChronosError.prototype.name = 'ChronosError';

      function ChronosError(message) {
        this.message = message;
      }

      return ChronosError;

    })();
  });

}).call(this);
