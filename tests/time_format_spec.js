(function() {
  var Chronos, TimeFormat, assert;

  assert = require('assert');

  TimeFormat = require('../lib/time_format');

  Chronos = require('../lib/chronos');

  describe('TimeFormat', function() {
    it('formats a date in the past', function() {
      return assert.equal(Chronos["new"]('5 days ago').timeAgo(), '5 days ago');
    });
    return it('formats a date in the future', function() {
      return assert.equal(Chronos["new"]('5 days from now').timeFromNow(), '5 days from now');
    });
  });

}).call(this);
