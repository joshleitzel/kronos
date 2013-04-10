should = require 'should'
Chronos = require '../lib/chronos'

describe 'Chronos', ->
  testTime = new Date()
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