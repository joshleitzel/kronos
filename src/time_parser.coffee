`if (typeof define !== 'function') { var define = require('amdefine')(module); }`

define ['./chronos_time', './chronos_error', './relative_time_string'], (ChronosTime, ChronosError, RelativeTimeString) ->
  _isString = (input) -> Object.prototype.toString.call(input) is '[object String]'
  _isNumeric = (input) -> /^\d+$/.test input

  # This can eventually be expanded to support all kinds of natural language processing funness. For now, it just supports either basic relative strings—e.g., `2 hours ago`, `5 years from now`—or something that can be processed by [`Date.parse`](https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Date/parse). If we can't parse it ourselves we fall back to `Date.parse()`.
  class DateLanguageParser
    constructor: (languageString, context) ->
      try
        context = if context then [context] else []
        relativeTimeString = new RelativeTimeString(languageString, new TimeParser(context))

        return new TimeParser [relativeTimeString.toMilliseconds()]
      catch error
        parsedDate = Date.parse(languageString)
        if isNaN(parsedDate)
          throw new ChronosError "Unparseable language string: #{languageString}"
        else
          return new TimeParser [parsedDate]

  # A `Date` object is passed through as-is to `ChronosTime`, which only accepts date objects.
  class DateObjectParser
    constructor: (dateObj) ->
      return new ChronosTime(dateObj)

  # The native `Date` object can be instantiated with milliseconds, so just wrap it in one and go.
  class DateMillisecondsParser
    constructor: (milliseconds) ->
      return new DateObjectParser(new Date(milliseconds))

  # We make two enhancements to tbe built-in `Date` functionality here. First, we allow less information to be passed, such as only a year or a year and a month, which is too little information for the native `Date` object. Second, we remove the month zero-indexing.
  class DateNumericParser
    constructor: (args) ->
      dateObj = new Date(
        args[0],            # year
        # JavaScript zero-indexes months but that's not intuitive.
        args[1] - 1 or 0,   # month
        args[2] or 1,       # day
        args[3] or 0,       # hour
        args[4] or 0,       # minute
        args[5] or 0,       # second
        args[6] or 0        # millisecond
      )
      return new DateObjectParser(dateObj)

  # This is the base time parser, and the only one that is actually exposed. It is only responsible for deducing what the `args`, which are passed as a splat, mean, and sending them to the correct sub-parser (one of the classes above).
  class TimeParser
    # `args` have been splatted by the time they get here, so it is an array.
    constructor: (args) ->
      # In the case of no arguments, we use the current time.
      if args.length is 0
        return DateObjectParser(new Date())

      else if args.length is 1
        # It's a numeric year, e.g. `2004`.
        if _isNumeric(args[0]) and "#{args[0]}".length is 4
          return new DateNumericParser([args[0]])
        # It's milliseconds since the Epoch.
        else if _isNumeric(args[0])
          return new DateMillisecondsParser(args[0])
        # It's a `Date` object already.
        else if args[0] instanceof Date
          return new DateObjectParser(args[0])
        # It's a language string that we need to parse.
        else
          return new DateLanguageParser(args[0])

      else if args.length is 2
        # It's in `year, month` format.
        if _isNumeric(args[0]) and "#{args[0]}".length is 4
          return new DateNumericParser([args[0], args[1]])
        # It's a language string passed within a context.
        else
          if _isString(args[0])
            return new DateLanguageParser(args[0], args[1])
          else
            throw new ChronosError "Invalid arguments: #{args}"

      # Finally, if it's more than two arguments then it must be a series of numbers that represent a date, e.g. `2001, 1, 5`.
      else
        return new DateNumericParser(args)