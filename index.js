var eventNames = require('./event-names.json');
var mapping = require('./mapping.json');

module.exports = function(event) {
  if (event.type && eventNames.indexOf(event.type) !== -1) {
    return event.type;
  }
  var signature = Object.keys(event).sort().join('-');
  return mapping[signature];
};

module.exports.target = function(evt) {
  var result = { repo: '', user: '', branch: '' };
  if (evt.repository) {
    if (evt.repository.full_name) {
      var parts = evt.repository.full_name.split('/');
      result.user = parts[0];
      result.repo = parts[1];
    }
    if (!result.repo && evt.repository.name) {
      result.repo = evt.repository.name;
    }
    if (!result.user && evt.repository.owner) {
      if (evt.repository.owner.login || evt.repository.owner.name) {
        result.user = evt.repository.owner.login || evt.repository.owner.name;
      }
    }
    if (evt.repository.default_branch) {
      // this is a fallback value
      result.branch = evt.repository.default_branch;
    }
  }
  if (evt.ref) {
    if (typeof evt.ref === 'string') {
      if (evt.ref.substr(0, 'refs/heads/'.length) === 'refs/heads/') {
        result.branch = evt.ref.substr('refs/heads/'.length);
      }
    }
  }
  return result;
};
