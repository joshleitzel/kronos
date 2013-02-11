RelativeTimeString = require './relative_time_string'
ChronosTime = require './chronos_time'

class TimeParser
  _isString = (input) ->
    Object.prototype.toString.call(input) is '[object String]'
  
  constructor: (args...) ->
    # In the case of Chronos.new, the args are already splats when they get here
    if args[0] instanceof Array
      args = args[0]
    
    # If no args passed, assume now
    if args.length is 0
      return new ChronosTime(new Date().getTime())
    
    # Otherwise, first try to pass these args to the Date object
    # if the first one looks like a year (4 digits)
    if _isString(args[0]) or args.length >= 3
      date = if _isString(args[0])
        new Date(args[0])
      else
        # Note that it's not possible to call apply on the Date
        # constructor; see http://stackoverflow.com/a/217042/86937
        new Date(
          args[0] or 0,
          args[1] or 0,
          args[2] or 0,
          args[3] or 0,
          args[4] or 0,
          args[5] or 0,
          args[6] or 0
        )
      
      # If they work we're done
      unless date.toString() is 'Invalid Date'
        return new ChronosTime(date.getTime())
    
    # Two arguments mean a relative time & params
    if _isString(args[0]) or args.length is 2
      params = args[1] or {}
      params.context = new TimeParser(params.context) if params.context
      return new ChronosTime(new RelativeTimeString(args[0], params).toMilliseconds())
    
    # If we're here there can only be one argument
    # If a date object, pass it through
    if args[0] instanceof Date
      return new ChronosTime(args[0].getTime())
    
    # If we have digits, assume milliseconds -- pass it through
    if /^\d+$/.test args[0]
      return new ChronosTime(args[0])
    
    # If we're here someone's in trouble
    throw new ChronosError 'Parser error: Bad input'

module.exports = TimeParser if module?