`if (typeof define !== 'function') { var define = require('amdefine')(module); }`

define ['./time_utils'], (TimeUtils) ->
  class TimeSpan
    constructor: (milliseconds) ->
      @ms = milliseconds

    _round: (divisor) -> Math.round(@ms / divisor)

    milliseconds: -> @ms
    seconds: -> @_round(TimeUtils.SECOND_MS)
    minutes: -> @_round(TimeUtils.MINUTE_MS)
    hours: -> @_round(TimeUtils.HOUR_MS)
    days: -> @_round(TimeUtils.DAY_MS)
    weeks: -> @_round(TimeUtils.WEEK_MS)
    months: -> @_round(TimeUtils.MONTH_MS)
    years: -> @_round(TimeUtils.YEAR_MS)