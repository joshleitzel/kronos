class ChronosError extends Error
  name: 'ChronosError'
  constructor: (message) ->
    @message = message