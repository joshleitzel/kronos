`if (typeof define !== 'function') { var define = require('amdefine')(module); }`

define ['./time_utils'], (TimeUtils) ->
  class TimeFormat
    _phrase = (identifier, quantity, direction) ->
      direction = if direction is 'future' then 'from now' else 'ago'
      s = if quantity > 1 then 's' else ''
      "#{quantity} #{identifier}#{s} #{direction}"

    constructor: (milliseconds) ->
      @milliseconds = milliseconds

    format: ->
      elapsed = Date.now() - @milliseconds
      direction = if elapsed < 0 then 'future' else 'past'
      elapsed = Math.abs(elapsed)

      if elapsed < TimeUtils.MINUTE_MS
        _phrase 'second', Math.round(elapsed / TimeUtils.SECOND_MS), direction
      else if elapsed < TimeUtils.HOUR_MS
        _phrase 'minute', Math.round(elapsed / TimeUtils.MINUTE_MS), direction
      else if elapsed < TimeUtils.DAY_MS
        _phrase 'hour', Math.round(elapsed / TimeUtils.HOUR_MS), direction
      else if elapsed < TimeUtils.WEEK_MS
        _phrase 'day', Math.round(elapsed / TimeUtils.DAY_MS), direction
      else if elapsed < TimeUtils.MONTH_MS
        _phrase 'week', Math.round(elapsed / TimeUtils.WEEK_MS), direction
      else if elapsed < TimeUtils.YEAR_MS
        _phrase 'month', Math.round(elapsed / TimeUtils.MONTH_MS), direction
      else
        _phrase 'year', Math.round(elapsed / TimeUtils.YEAR_MS), direction