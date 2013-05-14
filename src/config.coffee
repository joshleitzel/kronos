`if (typeof define !== 'function') { var define = require('amdefine')(module); }`

define ['./chronos_error'], (ChronosError) ->
  class Config
    recognizedParameters: [
      'locale'
    ]

    set: (param, value) ->
      throw new ChronosError("Unrecognized config parameter: #{param}") unless param in @recognizedParameters

      @[param] = value

    handle: (property, value) ->
      if typeof property is 'string'
        return @[property] unless value
        @set property, value
      else
        @set param, val for param, val of property

  new Config