var fs = require('fs');
var https = require('https');
var path = require('path');
var rsvp = require('rsvp');


var SNIPPET_URL = 'https://js-agent.newrelic.com/nr-loader-full-current.min.js';

function getCurrentSnippetContent() {
  return new rsvp.Promise(function(resolve, reject) {
    https.get(SNIPPET_URL, function(response) {
      var data = '';

      response.on('data', function(chunk) {
        data += chunk;
      });

      response.on('end', function(err) {
        if (response.statusCode !== 200) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  });
}


module.exports = {
  description: 'Run this command to fetch and save the latest new relic snippet',

  install: function(options) {
    var snippetFile = path.join(options.project.root, 'vendor/newrelic-snippet.js');

    return getCurrentSnippetContent()
      .then(function(snippet) {
        return rsvp.denodeify(fs.writeFile)(snippetFile, snippet);
      });
  }
};
