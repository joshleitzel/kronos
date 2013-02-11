TimeWrapper = require './time_wrapper'
TimeString = require './time_string'

class RelativeTimeString extends TimeString
  constructor: (phrase, params) ->
    components = phrase.split(' ')
    
    @direction = if components[2] is 'ago' then 'past' else 'future'
    
    if params?.context
      @context = params.context
    
    super(phrase)
  
  toMilliseconds: ->
    milliseconds = super
    
    context = if @context then @context else new TimeWrapper()
    
    if @direction is 'past'
      new TimeWrapper(context.toMilliseconds() - milliseconds).toMilliseconds()
    else
      new TimeWrapper(context.toMilliseconds() + milliseconds).toMilliseconds()

module.exports = RelativeTimeString