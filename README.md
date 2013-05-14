# Chronos.js [![Build Status](https://travis-ci.org/joshleitzel/chronos.png?branch=master)](https://travis-ci.org/joshleitzel/chronos)
## Painless dates and times in JavaScript

Chronos is a small library that aims to take the mystery out of working with dates and times in JavaScript.

## Stability

Chronos is alpha-quality right now and is being aggressively developed. You’re encouraged to play with it and hack on it all you like and contribute to the project, but it’s not yet production-ready.

## Environments

Chronos can be run in Node or in a web browser as an AMD module.

## Features
- Create dates & times any way you would with the standard `Date` class, and then some
- Arithmetic: add and subtract times from each other; get the difference between two times
- Better syntax for timeouts and intervals, with optional conditionals
- Chaining: any Chronos operation that returns another date/time can be chained
- Relative date formatting
- Live DOM updates for relative times

## Tests

A full test suite is available, with all tests written in [Mocha](http://visionmedia.github.com/mocha/) and [CoffeeScript](http://coffeescript.org).

```
mocha tests
```

## Roadmap
- Real time zone support backed by `tzinfo` database
- Event system
- i18n

## License

Chronos is distributed under the MIT license. For a copy of the license, see `LICENSE.txt`.