`if (typeof define !== 'function') { var define = require('amdefine')(module); }`

define ['./interval'], (Interval) ->
  class ChronosConfig
    get: (property) ->
      @[property]()

    timezone: ->
      if process?.env?.TZ?
        process.env.TZ
      else
        'unknown'
    timezoneOffset: ->
      new Date().getTimezoneOffset()
    timezoneCode: ->
      new Date().toUTCString().split(' ')[5]

  new ChronosConfig