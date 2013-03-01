(function() {
  var Chronos, Interval, assert;

  assert = require('assert');

  Chronos = require('../lib/chronos');

  Interval = require('../lib/interval');

  describe('Interval', function() {
    it('should set an interval', function(done) {
      var count;
      count = 0;
      return Chronos.every('50 ms')["do"](function() {
        if (++count === 5) return done();
      });
    });
    it('should set an interval with a condition', function(done) {
      var cond, count;
      count = 0;
      cond = function() {
        if (count > 3) {
          done();
          return true;
        }
      };
      return Chronos.until(cond).every('50 ms')["do"](function() {
        return count++;
      });
    });
    return it('should set an interval with a variable interval');
  });

}).call(this);
