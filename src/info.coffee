`if (typeof define !== 'function') { var define = require('amdefine')(module); }`

privateMethods =
  timezone: ->
    if process?.env?.TZ?
      process.env.TZ
    else
      'unknown'
  timezoneOffset: ->
    new Date().getTimezoneOffset()
  timezoneCode: ->
    new Date().toUTCString().split(' ')[5]

define ['./interval'], (Interval) ->
  class Info
    get: (property) -> privateMethods[property]()

  new Info