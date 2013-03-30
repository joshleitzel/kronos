assert = require 'assert'
sinon = require 'sinon'
Chronos = require '../lib/chronos'

describe 'Chronos', ->
  describe 'instantiation', ->
    testTime = new Date()
    it 'with year-month-day-hour-minute-second-millisecond', ->
      assert.equal Chronos.new(2005, 1, 2, 3, 4, 5, 6).toMilliseconds(), new Date(2005, 0, 2, 3, 4, 5, 6).getTime()
    it 'with year-month-day-hour-minute-second', ->
      assert.equal Chronos.new(2005, 1, 2, 3, 4, 5).toMilliseconds(), new Date(2005, 0, 2, 3, 4, 5).getTime()
    it 'with year-month-day-hour-minute', ->
      assert.equal Chronos.new(2005, 1, 2, 3, 4).toMilliseconds(), new Date(2005, 0, 2, 3, 4).getTime()
    it 'with year-month-day-hour', ->
      assert.equal Chronos.new(2005, 1, 2, 3).toMilliseconds(), new Date(2005, 0, 2, 3).getTime()
    it 'with year-month-day', ->
      assert.equal Chronos.new(2005, 1, 2).toMilliseconds(), new Date(2005, 0, 2).getTime()
    it 'with year-month', ->
      assert.equal Chronos.new(2005, 1).toMilliseconds(), new Date(2005, 0).getTime()
    it 'with year', ->
      assert.equal Chronos.new(2005).toMilliseconds(), new Date(2005, 0, 01).getTime()
    it 'with milliseconds', ->
      assert.equal Chronos.new(testTime.getTime()).toMilliseconds(), testTime.getTime()
    it 'with a date object', ->
      assert.equal Chronos.new(testTime).toMilliseconds(), testTime.getTime()
    it 'with relative times and context', ->
      assert.equal Chronos.new('1 hour ago', testTime).toMilliseconds(), testTime.getTime() - 60 * 60 * 1000
    it 'with blah formatted dates', ->
      assert.equal Chronos.new('Aug 9, 1995').toMilliseconds(), new Date(1995, 07, 09).getTime()