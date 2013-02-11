(function() {
  var Interval, TimeString;

  TimeString = require('./time_string');

  Interval = (function() {

    Interval.prototype._setInterval = function() {
      var func,
        _this = this;
      if ((this.milliseconds != null) && (this.callback != null)) {
        func = this.condition != null ? function() {
          if (_this.condition()) {
            return clearInterval(_this.interval);
          } else {
            return _this.callback();
          }
        } : this.callback;
        this.interval = setInterval(func, this.milliseconds);
      }
      return this;
    };

    function Interval(params) {
      if (params.timeString) {
        this.milliseconds = new TimeString(params.timeString).toMilliseconds();
      }
      if (params.condition) this.condition = params.condition;
    }

    Interval.prototype.every = function(timeString) {
      this.milliseconds = new TimeString(timeString).toMilliseconds();
      return this._setInterval();
    };

    Interval.prototype["do"] = function(callback) {
      this.callback = callback;
      return this._setInterval();
    };

    return Interval;

  })();

  module.exports = Interval;

}).call(this);
