(function() {
  var ChronosTime, RelativeTimeString, TimeParser,
    __slice = Array.prototype.slice;

  RelativeTimeString = require('./relative_time_string');

  ChronosTime = require('./chronos_time');

  TimeParser = (function() {
    var _isString;

    _isString = function(input) {
      return Object.prototype.toString.call(input) === '[object String]';
    };

    function TimeParser() {
      var args, date, params;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      if (args[0] instanceof Array) args = args[0];
      if (args.length === 0) return new ChronosTime(new Date().getTime());
      if (_isString(args[0]) || args.length >= 3) {
        date = _isString(args[0]) ? new Date(args[0]) : new Date(args[0] || 0, args[1] || 0, args[2] || 0, args[3] || 0, args[4] || 0, args[5] || 0, args[6] || 0);
        if (date.toString() !== 'Invalid Date') {
          return new ChronosTime(date.getTime());
        }
      }
      if (_isString(args[0]) || args.length === 2) {
        params = args[1] || {};
        if (params.context) params.context = new TimeParser(params.context);
        return new ChronosTime(new RelativeTimeString(args[0], params).toMilliseconds());
      }
      if (args[0] instanceof Date) return new ChronosTime(args[0].getTime());
      if (/^\d+$/.test(args[0])) return new ChronosTime(args[0]);
      throw new ChronosError('Parser error: Bad input');
    }

    return TimeParser;

  })();

  if (typeof module !== "undefined" && module !== null) {
    module.exports = TimeParser;
  }

}).call(this);
