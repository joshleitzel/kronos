(function() {
  var ChronosTime, RelativeTimeString, assert;

  assert = require('assert');

  RelativeTimeString = require('../lib/relative_time_string');

  ChronosTime = require('../lib/chronos_time');

  describe('RelativeTimeString', function() {
    var fromNowTimeStringsAsMilliseconds, milliseconds, testDate, timeString, _results;
    testDate = Date.now();
    fromNowTimeStringsAsMilliseconds = {
      '5 minutes from now': testDate + 300000,
      '1 second from now': testDate + 1000,
      '8 years from now': testDate + 252288000000
    };
    _results = [];
    for (timeString in fromNowTimeStringsAsMilliseconds) {
      milliseconds = fromNowTimeStringsAsMilliseconds[timeString];
      _results.push((function(timeString, milliseconds) {
        return it(timeString.split(' ')[1], function() {
          return assert.equal(new RelativeTimeString(timeString, {
            context: new ChronosTime(testDate)
          }).toMilliseconds(), milliseconds);
        });
      })(timeString, milliseconds));
    }
    return _results;
  });

}).call(this);
