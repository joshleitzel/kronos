assert = require 'assert'
TimeString = require '../lib/time_string'

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
        assert.equal new TimeString(timeString).toMilliseconds(), milliseconds