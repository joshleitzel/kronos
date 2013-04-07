
  if (typeof define !== 'function') { var define = require('amdefine')(module); };

  define(['./time_string', './time_format', './chronos_dom'], function(TimeString, TimeFormat, ChronosDom) {
    var ChronosTime;
    return ChronosTime = (function() {

      function ChronosTime(dateObj) {
        this.dateObj = dateObj;
      }

      ChronosTime.prototype.toMilliseconds = function() {
        return this.dateObj.getTime();
      };

      ChronosTime.prototype.getDateObject = function() {
        return this.dateObj;
      };

      ChronosTime.prototype.plus = function(input) {
        return new ChronosTime(new Date(this.toMilliseconds() + new TimeString(input).toMilliseconds()));
      };

      ChronosTime.prototype.minus = function(input) {
        return new ChronosTime(new Date(this.toMilliseconds() - new TimeString(input).toMilliseconds()));
      };

      ChronosTime.prototype.year = function() {
        return parseInt(this.dateObj.getFullYear());
      };

      ChronosTime.prototype.month = function() {
        return parseInt(this.dateObj.getMonth()) + 1;
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
  });
