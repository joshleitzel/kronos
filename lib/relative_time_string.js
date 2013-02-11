(function() {
  var RelativeTimeString, TimeString, TimeWrapper,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  TimeWrapper = require('./time_wrapper');

  TimeString = require('./time_string');

  RelativeTimeString = (function() {

    __extends(RelativeTimeString, TimeString);

    function RelativeTimeString(phrase, params) {
      var components;
      components = phrase.split(' ');
      this.direction = components[2] === 'ago' ? 'past' : 'future';
      if (params != null ? params.context : void 0) this.context = params.context;
      RelativeTimeString.__super__.constructor.call(this, phrase);
    }

    RelativeTimeString.prototype.toMilliseconds = function() {
      var context, milliseconds;
      milliseconds = RelativeTimeString.__super__.toMilliseconds.apply(this, arguments);
      context = this.context ? this.context : new TimeWrapper();
      if (this.direction === 'past') {
        return new TimeWrapper(context.toMilliseconds() - milliseconds).toMilliseconds();
      } else {
        return new TimeWrapper(context.toMilliseconds() + milliseconds).toMilliseconds();
      }
    };

    return RelativeTimeString;

  })();

  module.exports = RelativeTimeString;

}).call(this);
