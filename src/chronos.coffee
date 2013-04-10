`if (typeof define !== 'function') { var define = require('amdefine')(module); }`

define ['./interval', './timeout', './time_parser'], (Interval, Timeout, TimeParser) ->
  in: (relativeTimeString) ->     new Timeout timeString: relativeTimeString
  every: (relativeTimeString) ->  new Interval timeString: relativeTimeString
  until: (condition) ->           new Interval condition: condition
  unless: (condition) ->          new Timeout condition: condition
  new: (args...) ->               new TimeParser(args)
  timeUntil: (args) ->            @new().timeUntil(@new(args))
  timeSince: (args) ->            @new().timeSince(@new(args))