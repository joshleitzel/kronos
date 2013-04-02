should = require 'should'
Chronos = require '../lib/chronos'

describe 'Chronos', ->
  describe 'instantiation', ->
    testTime = new Date()
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
        Chronos.new(2005).toMilliseconds().should.equal new Date(2005, 0, 01).getTime()
      it 'with milliseconds', ->
        Chronos.new(testTime.getTime()).toMilliseconds().should.equal testTime.getTime()
      it 'with a date object', ->
        Chronos.new(testTime).toMilliseconds().should.equal testTime.getTime()
      it 'with relative times and context', ->
        Chronos.new('1 hour ago', testTime).toMilliseconds().should.equal testTime.getTime() - 60 * 60 * 1000
      it 'with formatted dates', ->
        Chronos.new('Aug 9, 1995').toMilliseconds().should.equal new Date(1995, 07, 09).getTime()
    describe 'invalid inputs', ->
      it 'with unrecognizeable language string', ->
        (-> Chronos.new('meaningless')).should.throw 'Unparseable language string: meaningless'
      it 'with unrecognizeable language string and context', ->
        (-> Chronos.new('meaningless', context)).should.throw 'Unparseable language string: meaningless'
      it 'with meaningless arguments', ->
        (-> Chronos.new(7, 1)).should.throw 'Invalid arguments: 7,1'
        