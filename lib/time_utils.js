
  
if (typeof define !== 'function') { var define = require('amdefine')(module) }
;

  define(function() {
    var TimeUtils;
    TimeUtils = (function() {

      function TimeUtils() {
        this.SECOND_MS = 1000;
        this.MINUTE_MS = this.SECOND_MS * 60;
        this.HOUR_MS = this.MINUTE_MS * 60;
        this.DAY_MS = this.HOUR_MS * 24;
        this.WEEK_MS = this.DAY_MS * 7;
        this.MONTH_MS = this.DAY_MS * 30;
        this.YEAR_MS = this.DAY_MS * 365;
      }

      return TimeUtils;

    })();
    return new TimeUtils;
  });
