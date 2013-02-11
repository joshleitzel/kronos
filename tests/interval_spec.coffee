assert = require 'assert'
Chronos = require '../lib/chronos'
Interval = require '../lib/interval'

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