should      = require 'should'
sinon       = require 'sinon'
cheerio     = require 'cheerio'
Chronos     = require '../lib/chronos'
TimeString  = require '../lib/time_string'

describe 'Chronos', ->
  testTime = new Date()
  describe 'config', ->
    describe 'with property-value pairs', ->
      it 'sets a config param', ->
        Chronos.config 'locale', 'en-US'
        Chronos.config('locale').should.equal 'en-US'
      it 'throws an error with bad config', ->
        (-> Chronos.config('unrecognizedParam', 'nothing')).should.throw 'Unrecognized config parameter: unrecognizedParam'
    describe 'with a property-value object', ->
      it 'sets config params', ->
        Chronos.config locale: 'en-US'
        Chronos.config('locale').should.equal 'en-US'
      it 'throws an error with bad config', ->
        (-> Chronos.config(unrecognizedParam: 'nothing')).should.throw 'Unrecognized config parameter: unrecognizedParam'
  describe 'information', ->
    it 'gets the current timezone', ->
      process.env.TZ = 'America/New_York'
      Chronos.info('timezone').should.equal 'America/New_York'
    it 'detects timezone changes', (done) ->
      process.env.TZ = 'America/New_York'
      Chronos.on 'change:timezone', ((oldTZ, newTZ)->
        if oldTZ is 'America/New_York' and newTZ is 'America/Chicago'
          done()
      ), '1ms'
      process.env.TZ = 'America/Chicago'
  describe 'inspection', ->
    describe 'tells if the time is after another time', ->
      it 'if it is', ->
        Chronos.new().isAfter('2 days ago').should.equal true
      it "if it isn't", ->
        Chronos.new().isAfter('2 days from now').should.equal false
    describe 'tells if the time is before another time', ->
      it 'if it is', ->
        Chronos.new().isBefore('2 days from now').should.equal true
      it "if it isn't", ->
        Chronos.new().isBefore('2 days ago').should.equal false
    describe 'tells if the time is in the past', ->
      it 'if it is', ->
        Chronos.new('2 days ago').isPast().should.equal true
      it "if it isn't", ->
        Chronos.new('2 days from now').isPast().should.equal false
    describe 'tells if the time is in the future', ->
      it 'if it is', ->
        Chronos.new('2 days from now').isFuture().should.equal true
      it "if it isn't", ->
        Chronos.new('2 days ago').isFuture().should.equal false
  describe 'arithmetic', ->
    it 'adds time', ->
      Chronos.new(1360559971051).plus('2 minutes').toMilliseconds().should.equal 1360560091051
    it 'subtracts time', ->
      Chronos.new(1360559971051).minus('5 days').toMilliseconds().should.equal 1360127971051
    describe 'calculates the time until another time', ->
      it 'in minutes', ->
        Chronos.timeUntil('5 minutes from now').minutes().should.equal 5
      it 'in hours', ->
        Chronos.timeUntil('17 hours from now').hours().should.equal 17
      it 'in days', ->
        Chronos.timeUntil('2 days from now').days().should.equal 2
      it 'in weeks', ->
        Chronos.timeUntil('3 weeks from now').weeks().should.equal 3
      it 'in months', ->
        Chronos.timeUntil('2 months from now').months().should.equal 2
      it 'in years', ->
        Chronos.timeUntil('1 year from now').years().should.equal 1
    describe 'calculates the time since another time', ->
      it 'in minutes', ->
        Chronos.timeSince('5 minutes ago').minutes().should.equal 5
      it 'in hours', ->
        Chronos.timeSince('17 hours ago').hours().should.equal 17
      it 'in days', ->
        Chronos.timeSince('2 days ago').days().should.equal 2
      it 'in weeks', ->
        Chronos.timeSince('3 weeks ago').weeks().should.equal 3
      it 'in months', ->
        Chronos.timeSince('2 months ago').months().should.equal 2
      it 'in years', ->
        Chronos.timeSince('1 year ago').years().should.equal 1
  describe 'valid inputs', ->
    it 'with year-month-day-hour-minute-second-millisecond', ->
      Chronos.new(2005, 1, 2, 3, 4, 5, 6).toMilliseconds().should.equal new Date(2005, 0, 2, 3, 4, 5, 6).getTime()
    it 'with year-month-day-hour-minute-second', ->
      Chronos.new(2005, 1, 2, 3, 4, 5).toMilliseconds().should.equal new Date(2005, 0, 2, 3, 4, 5).getTime()
    it 'with year-month-day-hour-minute', ->
      Chronos.new(2005, 1, 2, 3, 4).toMilliseconds().should.equal new Date(2005, 0, 2, 3, 4).getTime()
    it 'with year-month-day-hour', ->
      Chronos.new(2005, 1, 2, 3).toMilliseconds().should.equal new Date(2005, 0, 2, 3).getTime()
    it 'with year-month-day', ->
      Chronos.new(2005, 1, 2).toMilliseconds().should.equal new Date(2005, 0, 2).getTime()
    it 'with year-month', ->
      Chronos.new(2005, 1).toMilliseconds().should.equal new Date(2005, 0).getTime()
    it 'with year', ->
      Chronos.new(2005).toMilliseconds().should.equal new Date(2005, 0, 1).getTime()
    it 'with milliseconds', ->
      Chronos.new(testTime.getTime()).toMilliseconds().should.equal testTime.getTime()
    it 'with a date object', ->
      Chronos.new(testTime).toMilliseconds().should.equal testTime.getTime()
    it 'with relative times and context', ->
      Chronos.new('1 hour ago', testTime).toMilliseconds().should.equal testTime.getTime() - 60 * 60 * 1000
    it 'with formatted dates', ->
      Chronos.new('Aug 9, 1995').toMilliseconds().should.equal new Date(1995, 7, 9).getTime()
  describe 'invalid inputs', ->
    it 'with unrecognizeable language string', ->
      (-> Chronos.new('meaningless')).should.throw 'Unparseable language string: meaningless'
    it 'with unrecognizeable language string and context', ->
      (-> Chronos.new('meaningless', context)).should.throw 'Unparseable language string: meaningless'
    it 'with meaningless arguments', ->
      (-> Chronos.new(7, 1)).should.throw 'Invalid arguments: 7,1'
  describe 'proxy functions from date object', ->
    time = Chronos.new(2000, 2, 3, 4, 5, 6, 7)

    it 'gets the year', -> time.year().should.equal 2000
    it 'gets the month', -> time.month().should.equal 2
    it 'gets the day', -> time.day().should.equal 3
    it 'gets the hour', -> time.hour().should.equal 4
    it 'gets the minute', -> time.minute().should.equal 5
    it 'gets the second', -> time.second().should.equal 6
    it 'gets the millisecond', -> time.millisecond().should.equal 7
  describe 'Interval', ->
    it 'should set an interval', (done) ->
      count = 0
      Chronos.every('50 ms').do ->
        if ++count is 5
          done()
    it 'should set an interval with a condition', (done) ->
      count = 0
      cond = ->
        if count > 3
          done()
          true
      Chronos.until(cond).every('50 ms').do ->
        count++
    it 'should set an interval with a variable interval'
  describe 'Timeout', ->
    it 'should set a timeout', (done) ->
      Chronos.in('1 second').do =>
        done()
    it 'should set a timeout with a failing condition', (done) ->
      Chronos.unless(=> false).in('50 ms').do =>
        done()
    it 'should set a timeout with a passing condition', (done)  ->
      spy = sinon.spy()
      Chronos.unless(=> true).in('50 ms').do(spy)
      setTimeout (-> done() unless spy.called), 60
  describe 'DOM', ->
    it 'updates DOM nodes', (done) ->
      $ = cheerio.load '<div id="live">Posted <span></span></div>'
      Chronos.new('10 seconds ago').live($('#live span'), ((time) -> time.timeAgo()), '1 second')
      setTimeout (-> done() if $('#live').text() is 'Posted 11 seconds ago'), 1000

  # TODO: Turn these into actual test cases
  describe 'TimeString', ->
    timeStringsAsMilliseconds =
      '3 s': 3000
      '1 second': 1000
      '2 seconds': 2000
      '9 m': 540000
      '1 minute': 60000
      '5 minutes': 300000
      '11 h': 39600000
      '1 hour': 3600000
      '23 hours': 82800000
      '15 d': 1296000000
      '1 day': 86400000
      '2 days': 172800000
      '19 w': 11491200000
      '1 week': 604800000
      '4 weeks': 2419200000
      '11 mo': 28512000000
      '1 month': 2592000000
      '2 months': 5184000000
      '12 y': 378432000000
      '1 year': 31536000000
      '8 years': 252288000000

    for timeString, milliseconds of timeStringsAsMilliseconds
      do (timeString, milliseconds) ->
        it timeString.split(' ')[1], ->
          new TimeString(timeString).toMilliseconds().should.equal milliseconds

  describe 'TimeFormat', ->
    it 'formats a date in the past', ->
      Chronos.new('5 days ago').timeAgo().should.equal '5 days ago'
    it 'formats a date in the future', ->
      Chronos.new('5 days from now').timeFromNow().should.equal '5 days from now'