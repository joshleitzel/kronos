(function() {
  var Chronos, should;

  should = require('should');

  Chronos = require('../lib/chronos');

  describe('Chronos', function() {
    return describe('instantiation', function() {
      var testTime;
      testTime = new Date();
      describe('valid inputs', function() {
        it('with year-month-day-hour-minute-second-millisecond', function() {
          return Chronos["new"](2005, 1, 2, 3, 4, 5, 6).toMilliseconds().should.equal(new Date(2005, 0, 2, 3, 4, 5, 6).getTime());
        });
        it('with year-month-day-hour-minute-second', function() {
          return Chronos["new"](2005, 1, 2, 3, 4, 5).toMilliseconds().should.equal(new Date(2005, 0, 2, 3, 4, 5).getTime());
        });
        it('with year-month-day-hour-minute', function() {
          return Chronos["new"](2005, 1, 2, 3, 4).toMilliseconds().should.equal(new Date(2005, 0, 2, 3, 4).getTime());
        });
        it('with year-month-day-hour', function() {
          return Chronos["new"](2005, 1, 2, 3).toMilliseconds().should.equal(new Date(2005, 0, 2, 3).getTime());
        });
        it('with year-month-day', function() {
          return Chronos["new"](2005, 1, 2).toMilliseconds().should.equal(new Date(2005, 0, 2).getTime());
        });
        it('with year-month', function() {
          return Chronos["new"](2005, 1).toMilliseconds().should.equal(new Date(2005, 0).getTime());
        });
        it('with year', function() {
          return Chronos["new"](2005).toMilliseconds().should.equal(new Date(2005, 0, 01).getTime());
        });
        it('with milliseconds', function() {
          return Chronos["new"](testTime.getTime()).toMilliseconds().should.equal(testTime.getTime());
        });
        it('with a date object', function() {
          return Chronos["new"](testTime).toMilliseconds().should.equal(testTime.getTime());
        });
        it('with relative times and context', function() {
          return Chronos["new"]('1 hour ago', testTime).toMilliseconds().should.equal(testTime.getTime() - 60 * 60 * 1000);
        });
        return it('with formatted dates', function() {
          return Chronos["new"]('Aug 9, 1995').toMilliseconds().should.equal(new Date(1995, 07, 09).getTime());
        });
      });
      return describe('invalid inputs', function() {
        it('with unrecognizeable language string', function() {
          return (function() {
            return Chronos["new"]('meaningless');
          }).should["throw"]('Unparseable language string: meaningless');
        });
        it('with unrecognizeable language string and context', function() {
          return (function() {
            return Chronos["new"]('meaningless', context);
          }).should["throw"]('Unparseable language string: meaningless');
        });
        return it('with meaningless arguments', function() {
          return (function() {
            return Chronos["new"](7, 1);
          }).should["throw"]('Invalid arguments: 7,1');
        });
      });
    });
  });

}).call(this);
