TimeString = require './time_string'

class Timeout
  _setTimeout: ->
    if @milliseconds? and @callback?
      func = if @condition?
        =>
          if @condition()
            clearTimeout @timeout
          else
            @callback()
      else
        @callback
      @timeout = setTimeout(func, @milliseconds)
    @
  constructor: (params) ->
    @milliseconds = new TimeString(params.timeString).toMilliseconds() if params.timeString
    @condition = params.condition if params.condition
  in: (timeString) ->
    @milliseconds = new TimeString(timeString).toMilliseconds()
    @_setTimeout()
  do: (callback) ->
    @callback = callback
    @_setTimeout()

module.exports = Timeout