TimeString = require './time_string'

class Interval
  _setInterval: ->
    if @milliseconds? and @callback?
      func = if @condition?
        =>
          if @condition()
            clearInterval @interval
          else
            @callback()
      else
        @callback
      @interval = setInterval(func, @milliseconds)
    @
  constructor: (params) ->
    @milliseconds = new TimeString(params.timeString).toMilliseconds() if params.timeString
    @condition = params.condition if params.condition
  every: (timeString) ->
    @milliseconds = new TimeString(timeString).toMilliseconds()
    @_setInterval()
  do: (callback) ->
    @callback = callback
    @_setInterval()

module.exports = Interval