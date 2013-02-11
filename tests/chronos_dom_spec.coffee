assert = require 'assert'
sinon = require 'sinon'
cheerio = require 'cheerio'
Chronos = require '../lib/chronos'
ChronosDOM = require '../lib/chronos_dom'

describe 'ChronosDOM', ->
  it 'updates DOM nodes', (done) ->
    $ = cheerio.load '<div id="live">Posted <span></span></div>'
    Chronos.new('10 seconds ago').live($('#live span'), ((time) -> time.timeAgo()), '1 second')
    setTimeout (-> done() if $('#live').text() is 'Posted 11 seconds ago'), 1000