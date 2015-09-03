var fs = require('fs');
var https = require('https');
var path = require('path');
var querystring = require('querystring');
var rsvp = require('rsvp');



function getSnippetForApp(appName, licenseKey, callback) {
  getNewRelicApps({'filter[name]': appName}, licenseKey, function(err, data) {
    if (err) {
      return callback(err);
    }

    var matchingApp = data.browser_applications[0];

    if (!matchingApp) {
      return callback(new Error('App not found'));
    }

    callback(null, matchingApp && matchingApp.loader_script);
  });
}

function getNewRelicApps(params, licenseKey, callback) {
  var basePath = '/v2/browser_applications.json';
  var query = querystring.stringify(params);
  var options = {
    hostname: 'api.newrelic.com',
    path: basePath + '?' + query,
    headers: {
      'X-Api-Key': licenseKey
    }
  };

  getJSON(options, callback);
}

function getJSON(options, callback) {
  var json = '';

  https.get(options, function(response) {
    response.on('data', function(chunk) {
      json += chunk;
    });

    response.on('end', function(err) {
      if (response.statusCode !== 200) {
        callback(new Error(JSON.parse(json).error.title));
      } else {
        callback(err, JSON.parse(json));
      }
    });
  });
}


module.exports = {
  description: 'Run this command to fetch and save the snippet for the named app',

  anonymousOptions: [
    'app-name',
    'license-key'
  ],

  install: function(options) {
    var appName = options.args[1];
    var licenseKey = options.args[2];
    var snippetFile = path.join(options.project.root, 'vendor/newrelic-snippet.html');

    return rsvp.denodeify(getSnippetForApp)(appName, licenseKey)
      .then(function(snippet) {
        return rsvp.denodeify(fs.writeFile)(snippetFile, snippet);
      });
  }
};
