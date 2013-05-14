`if (typeof define !== 'function') { var define = require('amdefine')(module); }`

define ['./interval', './timeout', './time_parser', './info', './config', './chronos_event_manager'], (Interval, Timeout, TimeParser, Info, Config, ChronosEventManager) ->
  in: (relativeTimeString) ->     new Timeout timeString: relativeTimeString
  every: (relativeTimeString) ->  new Interval timeString: relativeTimeString
  until: (condition) ->           new Interval condition: condition
  unless: (condition) ->          new Timeout condition: condition
  new: (args...) ->               new TimeParser(args)
  timeUntil: (args) ->            @new().timeUntil(@new(args))
  timeSince: (args) ->            @new().timeSince(@new(args))
  on: (event, callback, options...) ->        ChronosEventManager.on event, callback, options
  config: (property, value) ->    Config.handle property, value
  info: (property) ->             Info.get(property)