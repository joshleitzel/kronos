(function() {
  var Chronos, should;

  should = require('should');

  Chronos = require('../lib/chronos');

  describe('Chronos', function() {
    var testTime;
    testTime = new Date();
    describe('inspection', function() {
      describe('tells if the time is after another time', function() {
        it('if it is', function() {
          return Chronos["new"]().isAfter('2 days ago').should.equal(true);
        });
        return it("if it isn't", function() {
          return Chronos["new"]().isAfter('2 days from now').should.equal(false);
        });
      });
      describe('tells if the time is before another time', function() {
        it('if it is', function() {
          return Chronos["new"]().isBefore('2 days from now').should.equal(true);
        });
        return it("if it isn't", function() {
          return Chronos["new"]().isBefore('2 days ago').should.equal(false);
        });
      });
      describe('tells if the time is in the past', function() {
        it('if it is', function() {
          return Chronos["new"]('2 days ago').isPast().should.equal(true);
        });
        return it("if it isn't", function() {
          return Chronos["new"]('2 days from now').isPast().should.equal(false);
        });
      });
      return describe('tells if the time is in the future', function() {
        it('if it is', function() {
          return Chronos["new"]('2 days from now').isFuture().should.equal(true);
        });
        return it("if it isn't", function() {
          return Chronos["new"]('2 days ago').isFuture().should.equal(false);
        });
      });
    });
    describe('arithmetic', function() {
      describe('calculates the time until another time', function() {
        it('in milliseconds', function() {
          return Chronos["new"]('100 milliseconds ago').timeUntil('50 milliseconds from now').milliseconds().should.equal(50);
        });
        it('in seconds', function() {
          return Chronos["new"]('20 seconds ago').timeUntil('10 seconds from now').seconds().should.equal(10);
        });
        it('in minutes', function() {
          return Chronos.timeUntil('5 minutes from now').minutes().should.equal(5);
        });
        it('in hours', function() {
          return Chronos.timeUntil('17 hours from now').hours().should.equal(17);
        });
        it('in days', function() {
          return Chronos.timeUntil('2 days from now').days().should.equal(2);
        });
        it('in weeks', function() {
          return Chronos.timeUntil('3 weeks from now').weeks().should.equal(3);
        });
        it('in months', function() {
          return Chronos.timeUntil('2 months from now').months().should.equal(2);
        });
        return it('in years', function() {
          return Chronos.timeUntil('1 year from now').years().should.equal(1);
        });
      });
      return describe('calculates the time since another time', function() {
        it('in minutes', function() {
          return Chronos.timeSince('5 minutes ago').minutes().should.equal(5);
        });
        it('in hours', function() {
          return Chronos.timeSince('17 hours ago').hours().should.equal(17);
        });
        it('in days', function() {
          return Chronos.timeSince('2 days ago').days().should.equal(2);
        });
        it('in weeks', function() {
          return Chronos.timeSince('3 weeks ago').weeks().should.equal(3);
        });
        it('in months', function() {
          return Chronos.timeSince('2 months ago').months().should.equal(2);
        });
        return it('in years', function() {
          return Chronos.timeSince('1 year ago').years().should.equal(1);
        });
      });
    });
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

}).call(this);
