`if (typeof define !== 'function') { var define = require('amdefine')(module); }`

define ['./time_string', './time_format', './chronos_dom', './time_span'], (TimeString, TimeFormat, ChronosDom, TimeSpan) ->
  class ChronosTime
    constructor: (dateObj) -> @dateObj = dateObj
    toMilliseconds: -> @dateObj.getTime()
    getDateObject: -> @dateObj

    # Arithmetic
    plus: (input) ->
      new ChronosTime new Date(@toMilliseconds() + new TimeString(input).toMilliseconds())
    minus: (input) ->
      new ChronosTime new Date(@toMilliseconds() - new TimeString(input).toMilliseconds())
    timeUntil: (time) ->
      chronosTime = (require './chronos').new(time, @)
      new TimeSpan(chronosTime.toMilliseconds() - @toMilliseconds())
    timeSince: (time) ->
      chronosTime = (require './chronos').new(time, @)
      new TimeSpan(@toMilliseconds() - chronosTime.toMilliseconds())

    # From the Date object
    year: -> +@dateObj.getFullYear()
    # In our parsing process we remove the zero-indexing that JavaScript natively applies to months
    month: -> +@dateObj.getMonth() + 1
    day: -> +@dateObj.getDate()
    hour: -> +@dateObj.getHours()
    minute: -> +@dateObj.getMinutes()
    second: -> +@dateObj.getSeconds()
    millisecond: -> +@dateObj.getMilliseconds()
    toString: -> @dateObj.toString()

    # Inspection candy
    isAfter: (time) ->
      chronosTime = (require './chronos').new(time)
      @toMilliseconds() > chronosTime.toMilliseconds()

    isBefore: (time) -> not @isAfter(time)

    isPast: -> @isBefore((require './chronos').new())

    isFuture: -> not @isPast()

    # Format
    timeAgo: -> new TimeFormat(@toMilliseconds()).format()
    timeFromNow: -> @timeAgo() # no difference, just for developer convenience

    live: (domId, callback, interval = '5 seconds') ->
      ChronosDom.live(domId, callback, @, interval)