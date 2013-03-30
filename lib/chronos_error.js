(function() {
  var ChronosError,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  ChronosError = (function() {

    __extends(ChronosError, Error);

    ChronosError.prototype.name = 'ChronosError';

    function ChronosError(message) {
      this.message = message;
    }

    return ChronosError;

  })();

  module.exports = ChronosError;

}).call(this);
