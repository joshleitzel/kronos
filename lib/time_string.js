(function() {
  var TimeString, TimeUtils;

  TimeUtils = require('./time_utils');

  TimeString = (function() {
    var unitMap;

    unitMap = {
      'ms': 1,
      'millisecond': 1,
      'mmilliseconds': 1,
      's': TimeUtils.SECOND_MS,
      'second': TimeUtils.SECOND_MS,
      'seconds': TimeUtils.SECOND_MS,
      'm': TimeUtils.MINUTE_MS,
      'minute': TimeUtils.MINUTE_MS,
      'minutes': TimeUtils.MINUTE_MS,
      'h': TimeUtils.HOUR_MS,
      'hour': TimeUtils.HOUR_MS,
      'hours': TimeUtils.HOUR_MS,
      'd': TimeUtils.DAY_MS,
      'day': TimeUtils.DAY_MS,
      'days': TimeUtils.DAY_MS,
      'w': TimeUtils.WEEK_MS,
      'week': TimeUtils.WEEK_MS,
      'weeks': TimeUtils.WEEK_MS,
      'mo': TimeUtils.MONTH_MS,
      'month': TimeUtils.MONTH_MS,
      'months': TimeUtils.MONTH_MS,
      'y': TimeUtils.YEAR_MS,
      'year': TimeUtils.YEAR_MS,
      'years': TimeUtils.YEAR_MS
    };

    function TimeString(phrase) {
      var components;
      components = phrase.split(' ');
      this.quantity = parseInt(components[0]);
      this.unit = components[1];
    }

    TimeString.prototype.toMilliseconds = function() {
      return this.quantity * unitMap[this.unit];
    };

    return TimeString;

  })();

  module.exports = TimeString;

}).call(this);
