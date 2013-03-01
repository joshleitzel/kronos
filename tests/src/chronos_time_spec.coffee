assert = require 'assert'
ChronosTime = require '../lib/chronos_time'
Chronos = require '../lib/chronos'

describe 'ChronosTime', ->
  describe 'proxy functions from date object', ->
    time = new ChronosTime(new Date(2000, 2, 3, 4, 5, 6, 7))
  
    it 'gets the year', -> assert.equal time.year(), 2000
    it 'gets the month', -> assert.equal time.month(), 2
    it 'gets the day', -> assert.equal time.day(), 3
    it 'gets the hour', -> assert.equal time.hour(), 4
    it 'gets the minute', -> assert.equal time.minute(), 5
    it 'gets the second', -> assert.equal time.second(), 6
    it 'gets the millisecond', -> assert.equal time.millisecond(), 7
  
  describe 'arithmetic', ->
    time = new ChronosTime(1360559971051)
    
    it 'adds time', ->
      assert.equal time.plus('2 minutes').toMilliseconds(), 1360560091051
    
    it 'subtracts time', ->
      assert.equal time.minus('5 days').toMilliseconds(), 1360127971051