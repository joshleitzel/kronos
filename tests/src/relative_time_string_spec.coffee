assert = require 'assert'
RelativeTimeString = require '../lib/relative_time_string'
Chronos = require '../lib/chronos'
ChronosTime = require '../lib/chronos_time'

describe 'RelativeTimeString', ->
  testDate = Date.now()

  fromNowTimeStringsAsMilliseconds =
    '5 minutes from now': testDate + 300000
    '1 second from now': testDate + 1000
    '8 years from now': testDate + 252288000000

  for timeString, milliseconds of fromNowTimeStringsAsMilliseconds
    do (timeString, milliseconds) ->
      it timeString.split(' ')[1], ->
        assert.equal new RelativeTimeString(timeString, Chronos.new(testDate)).toMilliseconds(), milliseconds