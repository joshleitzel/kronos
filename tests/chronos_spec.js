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
        return assert.equal(Chronos["new"](2005, 1, 2, 3, 4, 5, 6).toMilliseconds(), new Date(2005, 0, 2, 3, 4, 5, 6).getTime());
      });
      it('with year-month-day-hour-minute-second', function() {
        return assert.equal(Chronos["new"](2005, 1, 2, 3, 4, 5).toMilliseconds(), new Date(2005, 0, 2, 3, 4, 5).getTime());
      });
      it('with year-month-day-hour-minute', function() {
        return assert.equal(Chronos["new"](2005, 1, 2, 3, 4).toMilliseconds(), new Date(2005, 0, 2, 3, 4).getTime());
      });
      it('with year-month-day-hour', function() {
        return assert.equal(Chronos["new"](2005, 1, 2, 3).toMilliseconds(), new Date(2005, 0, 2, 3).getTime());
      });
      it('with year-month-day', function() {
        return assert.equal(Chronos["new"](2005, 1, 2).toMilliseconds(), new Date(2005, 0, 2).getTime());
      });
      it('with year-month', function() {
        return assert.equal(Chronos["new"](2005, 1).toMilliseconds(), new Date(2005, 0).getTime());
      });
      it('with year', function() {
        return assert.equal(Chronos["new"](2005).toMilliseconds(), new Date(2005, 0, 01).getTime());
      });
      it('with milliseconds', function() {
        return assert.equal(Chronos["new"](testTime.getTime()).toMilliseconds(), testTime.getTime());
      });
      it('with a date object', function() {
        return assert.equal(Chronos["new"](testTime).toMilliseconds(), testTime.getTime());
      });
      it('with relative times and context', function() {
        return assert.equal(Chronos["new"]('1 hour ago', testTime).toMilliseconds(), testTime.getTime() - 60 * 60 * 1000);
      });
      return it('with blah formatted dates', function() {
        return assert.equal(Chronos["new"]('Aug 9, 1995').toMilliseconds(), new Date(1995, 07, 09).getTime());
      });
    });
  });

}).call(this);
