
  if (typeof define !== 'function') { var define = require('amdefine')(module); };

  define(['./time_string'], function(TimeString) {
    var Timeout;
    return Timeout = (function() {

      Timeout.prototype._setTimeout = function() {
        var func,
          _this = this;
        if ((this.milliseconds != null) && (this.callback != null)) {
          func = this.condition != null ? function() {
            if (_this.condition()) {
              return clearTimeout(_this.timeout);
            } else {
              return _this.callback();
            }
          } : this.callback;
          this.timeout = setTimeout(func, this.milliseconds);
        }
        return this;
      };

      function Timeout(params) {
        if (params.timeString) {
          this.milliseconds = new TimeString(params.timeString).toMilliseconds();
        }
        if (params.condition) this.condition = params.condition;
      }

      Timeout.prototype["in"] = function(timeString) {
        this.milliseconds = new TimeString(timeString).toMilliseconds();
        return this._setTimeout();
      };

      Timeout.prototype["do"] = function(callback) {
        this.callback = callback;
        return this._setTimeout();
      };

      return Timeout;

    })();
  });
