var eventNames = require('./event-names.json');
var mapping = require('./mapping.json');

module.exports = function(event) {
  if (event.type && eventNames.indexOf(event.type) !== -1) {
    return event.type;
  }
  var signature = Object.keys(event).sort().join('-');
  return mapping[signature];
};
