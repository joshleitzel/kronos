(function() {
  var __slice = Array.prototype.slice,
    __hasProp = Object.prototype.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor; child.__super__ = parent.prototype; return child; };

  ({
    baseUrl: '.',
    name: 'chronos',
    out: 'chronos.build.js'
  });

  if (typeof define !== 'function') { var define = require('amdefine')(module); };

  define(['./interval', './timeout', './time_parser'], function(Interval, Timeout, TimeParser) {
    return {
      "in": function(relativeTimeString) {
        return new Timeout({
          timeString: relativeTimeString
        });
      },
      every: function(relativeTimeString) {
        return new Interval({
          timeString: relativeTimeString
        });
      },
      until: function(condition) {
        return new Interval({
          condition: condition
        });
      },
      unless: function(condition) {
        return new Timeout({
          condition: condition
        });
      },
      "new": function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return new TimeParser(args);
      }
    };
  });

  if (typeof define !== 'function') { var define = require('amdefine')(module); };

  define(['./interval'], function(Interval) {
    var ChronosDom;
    ChronosDom = (function() {

      function ChronosDom() {}

      ChronosDom.prototype.element = function(domId) {
        var domObject, domSearcher;
        if (typeof domId === 'string') {
          domSearcher = domId[0] === '#' ? domId.substring(1, domId.length) : domId;
          domObject = document.getElementById(domSearcher);
        } else {
          domObject = domId;
        }
        if (domObject == null) throw new Error("Element " + domId + " not found");
        return domObject;
      };

      ChronosDom.prototype.setText = function(element, text) {
        if (typeof element.text === 'function') {
          return element.text(text);
        } else {
          return element.innerHTML = text;
        }
      };

      ChronosDom.prototype.live = function(domId, callback, context, interval) {
        var domObject,
          _this = this;
        if (interval == null) interval = '5 seconds';
        domObject = this.element(domId);
        this.setText(domObject, callback(context));
        return new Interval({
          timeString: interval
        })["do"](function() {
          return _this.setText(domObject, callback(context));
        });
      };

      return ChronosDom;

    })();
    return new ChronosDom;
  });

  if (typeof define !== 'function') { var define = require('amdefine')(module); };

  define(function() {
    var ChronosError;
    return ChronosError = (function() {

      __extends(ChronosError, Error);

      ChronosError.prototype.name = 'ChronosError';

      function ChronosError(message) {
        this.message = message;
      }

      return ChronosError;

    })();
  });

  if (typeof define !== 'function') { var define = require('amdefine')(module); };

  define(['./time_string', './time_format', './chronos_dom'], function(TimeString, TimeFormat, ChronosDom) {
    var ChronosTime;
    return ChronosTime = (function() {

      function ChronosTime(dateObj) {
        this.dateObj = dateObj;
      }

      ChronosTime.prototype.toMilliseconds = function() {
        return this.dateObj.getTime();
      };

      ChronosTime.prototype.getDateObject = function() {
        return this.dateObj;
      };

      ChronosTime.prototype.plus = function(input) {
        return new ChronosTime(new Date(this.toMilliseconds() + new TimeString(input).toMilliseconds()));
      };

      ChronosTime.prototype.minus = function(input) {
        return new ChronosTime(new Date(this.toMilliseconds() - new TimeString(input).toMilliseconds()));
      };

      ChronosTime.prototype.year = function() {
        return parseInt(this.dateObj.getFullYear());
      };

      ChronosTime.prototype.month = function() {
        return parseInt(this.dateObj.getMonth()) + 1;
      };

      ChronosTime.prototype.day = function() {
        return parseInt(this.dateObj.getDate());
      };

      ChronosTime.prototype.hour = function() {
        return parseInt(this.dateObj.getHours());
      };

      ChronosTime.prototype.minute = function() {
        return parseInt(this.dateObj.getMinutes());
      };

      ChronosTime.prototype.second = function() {
        return parseInt(this.dateObj.getSeconds());
      };

      ChronosTime.prototype.millisecond = function() {
        return parseInt(this.dateObj.getMilliseconds());
      };

      ChronosTime.prototype.toString = function() {
        return this.dateObj.toString();
      };

      ChronosTime.prototype.timeAgo = function() {
        return new TimeFormat(this.toMilliseconds()).format();
      };

      ChronosTime.prototype.timeFromNow = function() {
        return this.timeAgo();
      };

      ChronosTime.prototype.live = function(domId, callback, interval) {
        if (interval == null) interval = '5 seconds';
        return ChronosDom.live(domId, callback, this, interval);
      };

      return ChronosTime;

    })();
  });

  if (typeof define !== 'function') { var define = require('amdefine')(module); };

  define(['./time_string'], function(TimeString) {
    var Interval;
    return Interval = (function() {

      Interval.prototype._setInterval = function() {
        var func,
          _this = this;
        if ((this.milliseconds != null) && (this.callback != null)) {
          func = this.condition != null ? function() {
            if (_this.condition()) {
              return clearInterval(_this.interval);
            } else {
              return _this.callback();
            }
          } : this.callback;
          this.interval = setInterval(func, this.milliseconds);
        }
        return this;
      };

      function Interval(params) {
        if (params.timeString) {
          this.milliseconds = new TimeString(params.timeString).toMilliseconds();
        }
        if (params.condition) this.condition = params.condition;
      }

      Interval.prototype.every = function(timeString) {
        this.milliseconds = new TimeString(timeString).toMilliseconds();
        return this._setInterval();
      };

      Interval.prototype["do"] = function(callback) {
        this.callback = callback;
        return this._setInterval();
      };

      return Interval;

    })();
  });

  if (typeof define !== 'function') { var define = require('amdefine')(module); };

  define(['./time_string'], function(TimeString) {
    var RelativeTimeString;
    return RelativeTimeString = (function() {

      __extends(RelativeTimeString, TimeString);

      function RelativeTimeString(phrase, context) {
        var components;
        components = phrase.split(' ');
        this.direction = components[2] === 'ago' ? 'past' : 'future';
        this.context = context;
        RelativeTimeString.__super__.constructor.call(this, phrase);
      }

      RelativeTimeString.prototype.toMilliseconds = function() {
        var milliseconds;
        milliseconds = RelativeTimeString.__super__.toMilliseconds.apply(this, arguments);
        if (this.direction === 'past') {
          return this.context.toMilliseconds() - milliseconds;
        } else {
          return this.context.toMilliseconds() + milliseconds;
        }
      };

      return RelativeTimeString;

    })();
  });

  if (typeof define !== 'function') { var define = require('amdefine')(module); };

  define(['./time_utils'], function(TimeUtils) {
    var TimeFormat;
    return TimeFormat = (function() {
      var _phrase;

      _phrase = function(identifier, quantity, direction) {
        var s;
        direction = direction === 'future' ? 'from now' : 'ago';
        s = quantity > 1 ? 's' : '';
        return "" + quantity + " " + identifier + s + " " + direction;
      };

      function TimeFormat(milliseconds) {
        this.milliseconds = milliseconds;
      }

      TimeFormat.prototype.format = function() {
        var direction, elapsed;
        elapsed = Date.now() - this.milliseconds;
        direction = elapsed < 0 ? 'future' : 'past';
        elapsed = Math.abs(elapsed);
        if (elapsed < TimeUtils.MINUTE_MS) {
          return _phrase('second', Math.round(elapsed / TimeUtils.SECOND_MS), direction);
        } else if (elapsed < TimeUtils.HOUR_MS) {
          return _phrase('minute', Math.round(elapsed / TimeUtils.MINUTE_MS), direction);
        } else if (elapsed < TimeUtils.DAY_MS) {
          return _phrase('hour', Math.round(elapsed / TimeUtils.HOUR_MS), direction);
        } else if (elapsed < TimeUtils.WEEK_MS) {
          return _phrase('day', Math.round(elapsed / TimeUtils.DAY_MS), direction);
        } else if (elapsed < TimeUtils.MONTH_MS) {
          return _phrase('week', Math.round(elapsed / TimeUtils.WEEK_MS), direction);
        } else if (elapsed < TimeUtils.YEAR_MS) {
          return _phrase('month', Math.round(elapsed / TimeUtils.MONTH_MS), direction);
        } else {
          return _phrase('year', Math.round(elapsed / TimeUtils.YEAR_MS), direction);
        }
      };

      return TimeFormat;

    })();
  });

  if (typeof define !== 'function') { var define = require('amdefine')(module); };

  define(['./chronos_time', './chronos_error', './relative_time_string'], function(ChronosTime, ChronosError, RelativeTimeString) {
    var DateLanguageParser, DateMillisecondsParser, DateNumericParser, DateObjectParser, TimeParser, _isNumeric, _isString;
    _isString = function(input) {
      return Object.prototype.toString.call(input) === '[object String]';
    };
    _isNumeric = function(input) {
      return /^\d+$/.test(input);
    };
    DateLanguageParser = (function() {

      function DateLanguageParser(languageString, context) {
        var parsedDate, relativeTimeString;
        try {
          context = context ? [context] : [];
          relativeTimeString = new RelativeTimeString(languageString, new TimeParser(context));
          return new TimeParser([relativeTimeString.toMilliseconds()]);
        } catch (error) {
          parsedDate = Date.parse(languageString);
          if (isNaN(parsedDate)) {
            throw new ChronosError("Unparseable language string: " + languageString);
          } else {
            return new TimeParser([parsedDate]);
          }
        }
      }

      return DateLanguageParser;

    })();
    DateObjectParser = (function() {

      function DateObjectParser(dateObj) {
        return new ChronosTime(dateObj);
      }

      return DateObjectParser;

    })();
    DateMillisecondsParser = (function() {

      function DateMillisecondsParser(milliseconds) {
        return new DateObjectParser(new Date(milliseconds));
      }

      return DateMillisecondsParser;

    })();
    DateNumericParser = (function() {

      function DateNumericParser(args) {
        var dateObj;
        dateObj = new Date(args[0], args[1] - 1 || 0, args[2] || 1, args[3] || 0, args[4] || 0, args[5] || 0, args[6] || 0);
        return new DateObjectParser(dateObj);
      }

      return DateNumericParser;

    })();
    return TimeParser = (function() {

      function TimeParser(args) {
        if (args.length === 0) {
          return DateObjectParser(new Date());
        } else if (args.length === 1) {
          if (_isNumeric(args[0]) && ("" + args[0]).length === 4) {
            return new DateNumericParser([args[0]]);
          } else if (_isNumeric(args[0])) {
            return new DateMillisecondsParser(args[0]);
          } else if (args[0] instanceof Date) {
            return new DateObjectParser(args[0]);
          } else {
            return new DateLanguageParser(args[0]);
          }
        } else if (args.length === 2) {
          if (_isNumeric(args[0]) && ("" + args[0]).length === 4) {
            return new DateNumericParser([args[0], args[1]]);
          } else {
            if (_isString(args[0])) {
              return new DateLanguageParser(args[0], args[1]);
            } else {
              throw new ChronosError("Invalid arguments: " + args);
            }
          }
        } else {
          return new DateNumericParser(args);
        }
      }

      return TimeParser;

    })();
  });

  if (typeof define !== 'function') { var define = require('amdefine')(module); };

  define(['./time_utils', './chronos_error'], function(TimeUtils, ChronosError) {
    var TimeString;
    return TimeString = (function() {
      var unitMap;

      unitMap = {
        'ms': 1,
        'millisecond': 1,
        'mmilliseconds': 1,
        's': TimeUtils.SECOND_MS,
        'second': TimeUtils.SECOND_MS,
        'seconds': TimeUtils.SECOND_MS,
        'm': TimeUtils.MINUTE_MS,
        'minute': TimeUtils.MINUTE_MS,
        'minutes': TimeUtils.MINUTE_MS,
        'h': TimeUtils.HOUR_MS,
        'hour': TimeUtils.HOUR_MS,
        'hours': TimeUtils.HOUR_MS,
        'd': TimeUtils.DAY_MS,
        'day': TimeUtils.DAY_MS,
        'days': TimeUtils.DAY_MS,
        'w': TimeUtils.WEEK_MS,
        'week': TimeUtils.WEEK_MS,
        'weeks': TimeUtils.WEEK_MS,
        'mo': TimeUtils.MONTH_MS,
        'month': TimeUtils.MONTH_MS,
        'months': TimeUtils.MONTH_MS,
        'y': TimeUtils.YEAR_MS,
        'year': TimeUtils.YEAR_MS,
        'years': TimeUtils.YEAR_MS
      };

      function TimeString(phrase) {
        var components;
        components = phrase.split(' ');
        this.quantity = parseInt(components[0]);
        this.unit = components[1];
        if (!/^\d+$/.test(this.quantity)) {
          throw new ChronosError('Unparseable time string');
        }
      }

      TimeString.prototype.toMilliseconds = function() {
        return this.quantity * unitMap[this.unit];
      };

      return TimeString;

    })();
  });

  if (typeof define !== 'function') { var define = require('amdefine')(module); };

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

  if (typeof define !== 'function') { var define = require('amdefine')(module); };

  define(['./time_string'], function(TimeString) {
    var Timeout;
    return Timeout = (function() {

      Timeout.prototype._setTimeout = function() {
        var func,
          _this = this;
        if ((this.milliseconds != null) && (this.callback != null)) {
          func = this.condition != null ? function() {
            if (_this.condition()) {
              return clearTimeout(_this.timeout);
            } else {
              return _this.callback();
            }
          } : this.callback;
          this.timeout = setTimeout(func, this.milliseconds);
        }
        return this;
      };

      function Timeout(params) {
        if (params.timeString) {
          this.milliseconds = new TimeString(params.timeString).toMilliseconds();
        }
        if (params.condition) this.condition = params.condition;
      }

      Timeout.prototype["in"] = function(timeString) {
        this.milliseconds = new TimeString(timeString).toMilliseconds();
        return this._setTimeout();
      };

      Timeout.prototype["do"] = function(callback) {
        this.callback = callback;
        return this._setTimeout();
      };

      return Timeout;

    })();
  });

}).call(this);
