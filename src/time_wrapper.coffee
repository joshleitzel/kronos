class TimeWrapper
  constructor: (milliseconds) ->
    @milliseconds = if milliseconds then milliseconds else Date.now()
    @dateObj = new Date(@milliseconds)
  toMilliseconds: ->
    @milliseconds

module.exports = TimeWrapper