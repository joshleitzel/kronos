TimeString = require './time_string'
TimeWrapper = require './time_wrapper'
TimeFormat = require './time_format'
ChronosDom = require './chronos_dom'

class ChronosTime
  constructor: (milliseconds) ->
    @timeWrapper = new TimeWrapper(milliseconds)
    @dateObj = @timeWrapper.dateObj
  toMilliseconds: ->
    @timeWrapper.toMilliseconds()
  
  # Arithmetic
  plus: (input) ->
    new ChronosTime(@toMilliseconds() + new TimeString(input).toMilliseconds())
  
  minus: (input) ->
    new ChronosTime(@toMilliseconds() - new TimeString(input).toMilliseconds())
  
  # From the Date object
  year: -> parseInt(@dateObj.getFullYear())
  month: -> parseInt(@dateObj.getMonth())
  day: -> parseInt(@dateObj.getDate())
  hour: -> parseInt(@dateObj.getHours())
  minute: -> parseInt(@dateObj.getMinutes())
  second: -> parseInt(@dateObj.getSeconds())
  millisecond: -> parseInt(@dateObj.getMilliseconds())
  toString: -> @dateObj.toString()
  
  # Format
  timeAgo: -> new TimeFormat(@toMilliseconds()).format()
  timeFromNow: -> @timeAgo() # no difference, just for developer convenience
  
  live: (domId, callback, interval = '5 seconds') ->
    ChronosDom.live(domId, callback, @, interval)

module.exports = ChronosTime