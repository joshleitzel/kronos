TimeString = require './time_string'

class RelativeTimeString extends TimeString
  constructor: (phrase, context) ->
    components = phrase.split(' ')
    @direction = if components[2] is 'ago' then 'past' else 'future'
    @context = context

    super(phrase)

  toMilliseconds: ->
    milliseconds = super

    if @direction is 'past'
      @context.toMilliseconds() - milliseconds
    else
      @context.toMilliseconds() + milliseconds

module.exports = RelativeTimeString