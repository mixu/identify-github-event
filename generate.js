var fs = require('fs');
var path = require('path');
var _ = require('lodash');

// load all events
var all = fs.readdirSync(__dirname + '/sample-events').sort();

var mapping = {};
var eventNames = [];

all.forEach(function(event) {
  var eventName = _.capitalize(_.camelCase(path.basename(event, path.extname(event))));
  var keys = Object.keys(require(__dirname + '/sample-events/' + event));
  // union all keys excluding the current event
  var other = all.filter(function(name) {
    return name !== event;
  }).map(function(name) {
    return Object.keys(require(__dirname + '/sample-events/' + name));
  }).map(function(arr) {
    return arr.sort().join('-');
  });
  var signature = keys.sort().join('-');

  //console.log(require(__dirname + '/sample-events/' + event));
  // result is a set of keys that is expected on the event (unique keys)
  if (other.indexOf(signature) !== -1) {
    throw new Error('Event signatures are not unique! ' + eventName + ' shares a signature!');
  }
  mapping[signature] = eventName;
  eventNames.push(eventName);
});

fs.writeFileSync(__dirname + '/mapping.json', JSON.stringify(mapping, null, 2));
fs.writeFileSync(__dirname + '/event-names.json', JSON.stringify(eventNames, null, 2));
// console.log(eventNames);
// console.log(mapping);
console.log('Regenerated ./mapping.json and ./event-names.json');
