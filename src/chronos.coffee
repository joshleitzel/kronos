`if (typeof define !== 'function') { var define = require('amdefine')(module); }`

define ['./interval', './timeout', './time_parser', './chronos_config', './chronos_event_manager'], (Interval, Timeout, TimeParser, ChronosConfig, ChronosEventManager) ->
  in: (relativeTimeString) ->     new Timeout timeString: relativeTimeString
  every: (relativeTimeString) ->  new Interval timeString: relativeTimeString
  until: (condition) ->           new Interval condition: condition
  unless: (condition) ->          new Timeout condition: condition
  new: (args...) ->               new TimeParser(args)
  timeUntil: (args) ->            @new().timeUntil(@new(args))
  timeSince: (args) ->            @new().timeSince(@new(args))
  get: (property) ->              ChronosConfig.get(property)
  set: (property, value) ->       ChronosConfig.set(property, value)
  on: (event, callback, options...) ->        ChronosEventManager.on event, callback, options