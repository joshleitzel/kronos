# Chronos.js
## Painless dates and times in JavaScript
[![Build Status](https://travis-ci.org/joshleitzel/chronos.png?branch=master)](https://travis-ci.org/joshleitzel/chronos)

### What is Chronos?

Chronos is a small library that aims to take the mystery out of working with dates and times in JavaScript.

## Stability

Chronos is alpha-quality software right now and is being aggressively developed. You’re encouraged to play with it and hack on it all you like and contribute to the project, but it’s not yet production-ready.

## Environments

Chronos can be run in Node or in a web browser as an AMD module.

## Features
### Initialization & the `Chronos` Object

A `Chronos` object always represents a specific time. It can be instantiated with a variety of inputs:

```
new Chronos(); // the current time
Chronos.now(); // alias for new Chronos()
Chronos.new('5 days ago');
Chronos.new('1 minute from now');
Chronos.new(2392038238902); // milliseconds since epoch
Chronos.new(new Date()); // JavaScript Date object
Chronos.new(2012, 1, 17); // year, month, day
Chronos.new(2012, 1, 17, 19, 7, 4); // year, month, day, hour, minutes, seconds
```

After instantiation, all `Chronos` objects behave the same way and have the same operations available on them.

### Date Arithmetic
Arithmetic with Chronos is a time-saver! Check it:

```
Chronos.now(); // Sat, 28 Jul 2012 08:35:52 GMT 
Chronos.now().plus('2 minutes'); // Sat, 28 Jul 2012 08:37:52 GMT
Chronos.now().plus('1 hour'); // Sat, 28 Jul 2012 09:35:52 GMT
Chronos.now().minus('5 weeks'); // Sat, 23 Jun 2012 08:35:52 GMT
Chronos.now().minus('1 year'); // Wed, 23 Jul 2011 08:35:52 GMT
```

```
Chronos.now(); // January 1
Chronos.timeUntil('January 6'); // 5 days
Chronos.timeSince('December 20'); // 11 days
```

### Timeouts & Intervals

Instead of:

```
billyBrushedHisTeeth = false;
setTimeout(function() {
  if (billyBrushedHisTeeth === false) billysAllowance--;
}, 120000);
```

try this:

```
Chronos.in('2 minutes').do(function() {
  if (billyBrushedHisTeeth === false) billysAllowance--;
});
```

Intervals are just as easy:

```
Chronos.every('5 minutes').do(function() {
  console.log('Nothing in our world is more unyielding than the inexorable march of time.');
});
```

In addition to better timeout/interval syntax, you can supply conditions. Conditions are just functions that return some value. In the case of timeouts, when it's time for the timeout to be invoked, the conditional function will first be called. If the function returns a truthy value, the timeout will be canceled; otherwise, it will continue. In the case of intervals, the conditional function will be tried each time the interval is invoked, and the interval will be canceled when the function returns a truthy value. Some examples: 

```
obj = {};
timeout = setTimeout(function() {
  alert('Could not communicate with server.');
}, 10000);
$.get('/my/server', {
  success: function(response) {
    obj.data = response;
    clearTimeout(timeout);
  }
});
```

can be rewritten like so:

```
obj = {};
Chronos.in('10 seconds').do(function() {
  alert('Could not communicate with server.');
}).unless(function() { return obj.data });
$.get('/my/server', {
  success: function(response) {
    obj.data = response;
  }
});
```
 
```
Chronos.every('2 seconds').do(function() {
  alert("I'm not touching you!");
}).until(function() {
  return sister.isSufficientlyAgitated; // this function returning true causes the interval to be canceled
});
```

### Chaining

Chronos operations that return another date/time can be chained:

```
Chronos.now().minus('1 day').plus('1 hour');
```

### Relative Times in the Past

```
Chronos.now(); // 2012-03-27
Chronos.new(2012, 2, 25).timeAgo(); // 2 days ago
```

### Relative Times in the Future

```
Chronos.now(); // 2012-03-27
Chronos.new(2013, 2, 27).timeFromNow(); // 1 year from now
```

### Live Display Updates
If you want to display times on your site that are recent (e.g., “5 seconds ago”), it’s nice to have those immediately update as time passes and users stay on your page. Chronos provides a simple syntax for this:

```
Chronos.new('37 seconds ago').live('#timestamp', (time) -> time.ago())
```

## Tests

A full test suite is available, with all tests written in [Mocha](http://visionmedia.github.com/mocha/) and [CoffeeScript](http://coffeescript.org).

```
mocha tests
```

## License

Chronos is distributed under the MIT license. For a copy of the license, see `LICENSE.txt`.
