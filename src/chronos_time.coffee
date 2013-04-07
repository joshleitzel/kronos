`if (typeof define !== 'function') { var define = require('amdefine')(module); }`

define ['./time_string', './time_format', './chronos_dom'], (TimeString, TimeFormat, ChronosDom) ->
  class ChronosTime
    constructor: (dateObj) -> @dateObj = dateObj
    toMilliseconds: -> @dateObj.getTime()
    getDateObject: -> @dateObj

    # Arithmetic
    plus: (input) ->
      new ChronosTime new Date(@toMilliseconds() + new TimeString(input).toMilliseconds())
    minus: (input) ->
      new ChronosTime new Date(@toMilliseconds() - new TimeString(input).toMilliseconds())

    # From the Date object
    year: -> parseInt(@dateObj.getFullYear())
    # In our parsing process we remove the zero-indexing that JavaScript natively applies to months
    month: -> parseInt(@dateObj.getMonth()) + 1
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