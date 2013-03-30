class ChronosError extends Error
  name: 'ChronosError'
  constructor: (message) ->
    @message = message

module.exports = ChronosError