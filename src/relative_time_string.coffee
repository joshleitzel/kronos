`
if (typeof define !== 'function') { var define = require('amdefine')(module) }
`

define ['./time_string'], (TimeString) ->
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