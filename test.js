var fs = require('fs');
var path = require('path');
var assert = require('assert');
var _ = require('lodash');
var identify = require('./');
var eventNames = require('./event-names.json');
var all = fs.readdirSync(__dirname + '/sample-events').sort();

describe('identify', function() {

  it('identifies events with a known type key', function() {
    eventNames.map(function(name) {
      assert.equal(identify({ type: name}), name);
    });

  });

  it('identifies events with no type key but that have a known signature', function() {
    all.map(function(name) {
      var expected = _.capitalize(_.camelCase(path.basename(name, path.extname(name))));
      assert.equal(identify(require(__dirname + '/sample-events/' + name)), expected);
    });
  });

});
