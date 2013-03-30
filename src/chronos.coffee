Interval =                  require './interval'
Timeout =                   require './timeout'
TimeParser =  require './time_parser'

class Chronos
  in: (relativeTimeString) ->     new Timeout timeString: relativeTimeString
  every: (relativeTimeString) ->  new Interval timeString: relativeTimeString
  until: (condition) ->           new Interval condition: condition
  unless: (condition) ->          new Timeout condition: condition
  new: (args...) ->               new TimeParser(args)
  now: ->                         new TimeParser()

if module?
  module.exports = new Chronos
else
  Chronos = new Chronos