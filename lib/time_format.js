(function() {
  var TimeFormat, TimeUtils;

  TimeUtils = require('./time_utils');

  TimeFormat = (function() {
    var _phrase;

    _phrase = function(identifier, quantity, direction) {
      var s;
      direction = direction === 'future' ? 'from now' : 'ago';
      s = quantity > 1 ? 's' : '';
      return "" + quantity + " " + identifier + s + " " + direction;
    };

    function TimeFormat(milliseconds) {
      this.milliseconds = milliseconds;
    }

    TimeFormat.prototype.format = function() {
      var direction, elapsed;
      elapsed = Date.now() - this.milliseconds;
      direction = elapsed < 0 ? 'future' : 'past';
      elapsed = Math.abs(elapsed);
      if (elapsed < TimeUtils.MINUTE_MS) {
        return _phrase('second', Math.round(elapsed / TimeUtils.SECOND_MS), direction);
      } else if (elapsed < TimeUtils.HOUR_MS) {
        return _phrase('minute', Math.round(elapsed / TimeUtils.MINUTE_MS), direction);
      } else if (elapsed < TimeUtils.DAY_MS) {
        return _phrase('hour', Math.round(elapsed / TimeUtils.HOUR_MS), direction);
      } else if (elapsed < TimeUtils.WEEK_MS) {
        return _phrase('day', Math.round(elapsed / TimeUtils.DAY_MS), direction);
      } else if (elapsed < TimeUtils.MONTH_MS) {
        return _phrase('week', Math.round(elapsed / TimeUtils.WEEK_MS), direction);
      } else if (elapsed < TimeUtils.YEAR_MS) {
        return _phrase('month', Math.round(elapsed / TimeUtils.MONTH_MS), direction);
      } else {
        return _phrase('year', Math.round(elapsed / TimeUtils.YEAR_MS), direction);
      }
    };

    return TimeFormat;

  })();

  if (typeof module !== "undefined" && module !== null) {
    module.exports = TimeFormat;
  }

}).call(this);
