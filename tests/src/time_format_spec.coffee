assert = require 'assert'
TimeFormat = require '../lib/time_format'
Chronos = require '../lib/chronos'

describe 'TimeFormat', ->
  it 'formats a date in the past', ->
    assert.equal Chronos.new('5 days ago').timeAgo(), '5 days ago'
  it 'formats a date in the future', ->
    assert.equal Chronos.new('5 days from now').timeFromNow(), '5 days from now'