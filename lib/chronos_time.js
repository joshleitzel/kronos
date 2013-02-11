(function() {
  var ChronosDom, ChronosTime, TimeFormat, TimeString, TimeWrapper;

  TimeString = require('./time_string');

  TimeWrapper = require('./time_wrapper');

  TimeFormat = require('./time_format');

  ChronosDom = require('./chronos_dom');

  ChronosTime = (function() {

    function ChronosTime(milliseconds) {
      this.timeWrapper = new TimeWrapper(milliseconds);
      this.dateObj = this.timeWrapper.dateObj;
    }

    ChronosTime.prototype.toMilliseconds = function() {
      return this.timeWrapper.toMilliseconds();
    };

    ChronosTime.prototype.plus = function(input) {
      return new ChronosTime(this.toMilliseconds() + new TimeString(input).toMilliseconds());
    };

    ChronosTime.prototype.minus = function(input) {
      return new ChronosTime(this.toMilliseconds() - new TimeString(input).toMilliseconds());
    };

    ChronosTime.prototype.year = function() {
      return parseInt(this.dateObj.getFullYear());
    };

    ChronosTime.prototype.month = function() {
      return parseInt(this.dateObj.getMonth());
    };

    ChronosTime.prototype.day = function() {
      return parseInt(this.dateObj.getDate());
    };

    ChronosTime.prototype.hour = function() {
      return parseInt(this.dateObj.getHours());
    };

    ChronosTime.prototype.minute = function() {
      return parseInt(this.dateObj.getMinutes());
    };

    ChronosTime.prototype.second = function() {
      return parseInt(this.dateObj.getSeconds());
    };

    ChronosTime.prototype.millisecond = function() {
      return parseInt(this.dateObj.getMilliseconds());
    };

    ChronosTime.prototype.toString = function() {
      return this.dateObj.toString();
    };

    ChronosTime.prototype.timeAgo = function() {
      return new TimeFormat(this.toMilliseconds()).format();
    };

    ChronosTime.prototype.timeFromNow = function() {
      return this.timeAgo();
    };

    ChronosTime.prototype.live = function(domId, callback, interval) {
      if (interval == null) interval = '5 seconds';
      return ChronosDom.live(domId, callback, this, interval);
    };

    return ChronosTime;

  })();

  module.exports = ChronosTime;

}).call(this);
