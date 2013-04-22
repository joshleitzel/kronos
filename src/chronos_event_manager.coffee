`if (typeof define !== 'function') { var define = require('amdefine')(module); }`

define ['./chronos_error', './interval'], (ChronosError, Interval) ->
  class ChronosEvent
    constructor: (event, callback) ->
      @event = event
      @callback = callback
    execute: (params) ->
      @callback.apply(@, params)
  class ChronosEventManager
    constructor: ->
      @events = {}
    on: (event, callback, options) ->
      alreadyRegistered = @events[event]?
      @events[event] = [] unless alreadyRegistered

      if event is 'change:timezone' and not alreadyRegistered
        oldTZ = process.env.TZ
        delay = options[0] or '5 minutes'
        (new Interval timeString: delay).do =>
          unless process.env.TZ is oldTZ
            @trigger 'change:timezone', oldTZ, process.env.TZ
          oldTZ = process.env.TZ

      @events[event].push new ChronosEvent(event, callback)
    trigger: (event, params...) ->
      if @events[event]?
        for callback in @events[event]
          callback.execute(params)
      else
        throw new ChronosError "Unknown event `#{event}' triggered"
  new ChronosEventManager