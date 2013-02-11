Interval = require './interval'
TimeParser = require './time_string'

class ChronosDom
  element: (domId) ->
    if typeof domId is 'string' 
      domSearcher = if domId[0] is '#' then domId.substring(1, domId.length) else domId
      domObject = document.getElementById(domSearcher)
    else
      domObject = domId
    throw new Error("Element #{domId} not found") unless domObject?
    domObject
  
  setText: (element, text) ->
    if typeof element.text is 'function'
      element.text text
    else
      element.innerHTML = text
  
  live: (domId, callback, context, interval = '5 seconds') ->
    domObject = @element(domId)
    @setText(domObject, callback(context))
    new Interval(timeString: interval).do =>
      @setText(domObject, callback(context))

# Obviously the DOM doesn't matter on the server
# but necessary for testing
if module?
  module.exports = new ChronosDom
else
  ChronosDOM = new ChronosDom