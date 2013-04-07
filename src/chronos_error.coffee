`if (typeof define !== 'function') { var define = require('amdefine')(module); }`

define ->
  class ChronosError extends Error
    name: 'ChronosError'
    constructor: (message) ->
      @message = message