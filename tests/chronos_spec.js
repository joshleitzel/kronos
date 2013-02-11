(function() {
  var Chronos, assert, sinon;

  assert = require('assert');

  sinon = require('sinon');

  Chronos = require('../lib/chronos');

  describe('Chronos', function() {
    return describe('instantiation', function() {
      var testTime;
      testTime = new Date();
      it('with year-month-day-hour-minute-second-millisecond', function() {
        return assert.equal(Chronos["new"](2005, 01, 01).toMilliseconds(), new Date(2005, 01, 01).getTime());
      });
      it('with year-month-day-hour-minute-second', function() {
        return assert.equal(Chronos["new"](2005, 01, 01).toMilliseconds(), new Date(2005, 01, 01).getTime());
      });
      it('with year-month-day-hour-minute', function() {
        return assert.equal(Chronos["new"](2005, 01, 01).toMilliseconds(), new Date(2005, 01, 01).getTime());
      });
      it('with year-month-day-hour', function() {
        return assert.equal(Chronos["new"](2005, 01, 01).toMilliseconds(), new Date(2005, 01, 01).getTime());
      });
      it('with year-month-day', function() {
        return assert.equal(Chronos["new"](2005, 01, 01).toMilliseconds(), new Date(2005, 01, 01).getTime());
      });
      it('with milliseconds', function() {
        return assert.equal(Chronos["new"](testTime.getTime()).toMilliseconds(), testTime.getTime());
      });
      it('with a date object', function() {
        return assert.equal(Chronos["new"](testTime).toMilliseconds(), testTime.getTime());
      });
      it('with relative times and context', function() {
        return assert.equal(Chronos["new"]('1 hour ago', {
          context: testTime
        }).toMilliseconds(), testTime.getTime() - 60 * 60 * 1000);
      });
      return it('with formatted dates', function() {
        return assert.equal(Chronos["new"]('Aug 9, 1995').toMilliseconds(), new Date(1995, 07, 09).getTime());
      });
    });
  });

}).call(this);
