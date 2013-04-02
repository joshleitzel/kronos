`
if (typeof define !== 'function') { var define = require('amdefine')(module) }
`

define ['./time_utils', './chronos_error'], (TimeUtils, ChronosError) ->
  class TimeString
    unitMap =
      'ms': 1
      'millisecond': 1
      'mmilliseconds': 1
      's': TimeUtils.SECOND_MS
      'second': TimeUtils.SECOND_MS
      'seconds': TimeUtils.SECOND_MS
      'm': TimeUtils.MINUTE_MS
      'minute': TimeUtils.MINUTE_MS
      'minutes': TimeUtils.MINUTE_MS
      'h': TimeUtils.HOUR_MS
      'hour': TimeUtils.HOUR_MS
      'hours': TimeUtils.HOUR_MS
      'd': TimeUtils.DAY_MS
      'day': TimeUtils.DAY_MS
      'days': TimeUtils.DAY_MS
      'w': TimeUtils.WEEK_MS
      'week': TimeUtils.WEEK_MS
      'weeks': TimeUtils.WEEK_MS
      'mo': TimeUtils.MONTH_MS
      'month': TimeUtils.MONTH_MS
      'months': TimeUtils.MONTH_MS
      'y': TimeUtils.YEAR_MS
      'year': TimeUtils.YEAR_MS
      'years': TimeUtils.YEAR_MS

    constructor: (phrase) ->
      components = phrase.split(' ')

      @quantity = parseInt(components[0])
      @unit = components[1]

      unless /^\d+$/.test @quantity
        throw new ChronosError 'Unparseable time string'

    toMilliseconds: ->
      @quantity * unitMap[@unit]