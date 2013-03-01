assert = require 'assert'
sinon = require 'sinon'
Chronos = require '../lib/chronos'
Timeout = require '../lib/timeout'

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
