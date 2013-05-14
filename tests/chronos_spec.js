// Generated by CoffeeScript 1.6.2
(function() {
  var Chronos, TimeString, cheerio, should, sinon;

  should = require('should');

  sinon = require('sinon');

  cheerio = require('cheerio');

  Chronos = require('../lib/chronos');

  TimeString = require('../lib/time_string');

  describe('Chronos', function() {
    var testTime;

    testTime = new Date();
    describe('top level information', function() {
      it('gets the current timezone', function() {
        process.env.TZ = 'America/New_York';
        return Chronos.get('timezone').should.equal('America/New_York');
      });
      return it('detects timezone changes', function(done) {
        process.env.TZ = 'America/New_York';
        Chronos.on('change:timezone', (function(oldTZ, newTZ) {
          if (oldTZ === 'America/New_York' && newTZ === 'America/Chicago') {
            return done();
          }
        }), '1ms');
        return process.env.TZ = 'America/Chicago';
      });
    });
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
      it('adds time', function() {
        return Chronos["new"](1360559971051).plus('2 minutes').toMilliseconds().should.equal(1360560091051);
      });
      it('subtracts time', function() {
        return Chronos["new"](1360559971051).minus('5 days').toMilliseconds().should.equal(1360127971051);
      });
      describe('calculates the time until another time', function() {
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
        return Chronos["new"](2005).toMilliseconds().should.equal(new Date(2005, 0, 1).getTime());
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
        return Chronos["new"]('Aug 9, 1995').toMilliseconds().should.equal(new Date(1995, 7, 9).getTime());
      });
    });
    describe('invalid inputs', function() {
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
    describe('proxy functions from date object', function() {
      var time;

      time = Chronos["new"](2000, 2, 3, 4, 5, 6, 7);
      it('gets the year', function() {
        return time.year().should.equal(2000);
      });
      it('gets the month', function() {
        return time.month().should.equal(2);
      });
      it('gets the day', function() {
        return time.day().should.equal(3);
      });
      it('gets the hour', function() {
        return time.hour().should.equal(4);
      });
      it('gets the minute', function() {
        return time.minute().should.equal(5);
      });
      it('gets the second', function() {
        return time.second().should.equal(6);
      });
      return it('gets the millisecond', function() {
        return time.millisecond().should.equal(7);
      });
    });
    describe('Interval', function() {
      it('should set an interval', function(done) {
        var count;

        count = 0;
        return Chronos.every('50 ms')["do"](function() {
          if (++count === 5) {
            return done();
          }
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
    describe('Timeout', function() {
      it('should set a timeout', function(done) {
        var _this = this;

        return Chronos["in"]('1 second')["do"](function() {
          return done();
        });
      });
      it('should set a timeout with a failing condition', function(done) {
        var _this = this;

        return Chronos.unless(function() {
          return false;
        })["in"]('50 ms')["do"](function() {
          return done();
        });
      });
      return it('should set a timeout with a passing condition', function(done) {
        var spy,
          _this = this;

        spy = sinon.spy();
        Chronos.unless(function() {
          return true;
        })["in"]('50 ms')["do"](spy);
        return setTimeout((function() {
          if (!spy.called) {
            return done();
          }
        }), 60);
      });
    });
    describe('DOM', function() {
      return it('updates DOM nodes', function(done) {
        var $;

        $ = cheerio.load('<div id="live">Posted <span></span></div>');
        Chronos["new"]('10 seconds ago').live($('#live span'), (function(time) {
          return time.timeAgo();
        }), '1 second');
        return setTimeout((function() {
          if ($('#live').text() === 'Posted 11 seconds ago') {
            return done();
          }
        }), 1000);
      });
    });
    describe('TimeString', function() {
      var milliseconds, timeString, timeStringsAsMilliseconds, _results;

      timeStringsAsMilliseconds = {
        '3 s': 3000,
        '1 second': 1000,
        '2 seconds': 2000,
        '9 m': 540000,
        '1 minute': 60000,
        '5 minutes': 300000,
        '11 h': 39600000,
        '1 hour': 3600000,
        '23 hours': 82800000,
        '15 d': 1296000000,
        '1 day': 86400000,
        '2 days': 172800000,
        '19 w': 11491200000,
        '1 week': 604800000,
        '4 weeks': 2419200000,
        '11 mo': 28512000000,
        '1 month': 2592000000,
        '2 months': 5184000000,
        '12 y': 378432000000,
        '1 year': 31536000000,
        '8 years': 252288000000
      };
      _results = [];
      for (timeString in timeStringsAsMilliseconds) {
        milliseconds = timeStringsAsMilliseconds[timeString];
        _results.push((function(timeString, milliseconds) {
          return it(timeString.split(' ')[1], function() {
            return new TimeString(timeString).toMilliseconds().should.equal(milliseconds);
          });
        })(timeString, milliseconds));
      }
      return _results;
    });
    return describe('TimeFormat', function() {
      it('formats a date in the past', function() {
        return Chronos["new"]('5 days ago').timeAgo().should.equal('5 days ago');
      });
      return it('formats a date in the future', function() {
        return Chronos["new"]('5 days from now').timeFromNow().should.equal('5 days from now');
      });
    });
  });

}).call(this);
