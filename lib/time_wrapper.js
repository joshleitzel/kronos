(function() {
  var TimeWrapper;

  TimeWrapper = (function() {

    function TimeWrapper(milliseconds) {
      this.milliseconds = milliseconds ? milliseconds : Date.now();
      this.dateObj = new Date(this.milliseconds);
    }

    TimeWrapper.prototype.toMilliseconds = function() {
      return this.milliseconds;
    };

    return TimeWrapper;

  })();

  module.exports = TimeWrapper;

}).call(this);
