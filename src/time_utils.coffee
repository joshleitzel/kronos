`if (typeof define !== 'function') { var define = require('amdefine')(module); }`

define ->
  class TimeUtils
    constructor: ->
      @SECOND_MS = 1000
      @MINUTE_MS = @SECOND_MS * 60
      @HOUR_MS   = @MINUTE_MS * 60
      @DAY_MS    = @HOUR_MS   * 24
      @WEEK_MS   = @DAY_MS    * 7
      @MONTH_MS  = @DAY_MS    * 30
      @YEAR_MS   = @DAY_MS    * 365
  new TimeUtils