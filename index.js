/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');


function readSnippet() {
  try {
    return fs.readFileSync(path.join(process.cwd(), 'vendor/newrelic-snippet.html'), {
      encoding: 'UTF-8'
    });
  } catch(error) {
    if (error.code === 'ENOENT') {
      return '';
    } else {
      throw error;
    }
  }
}


module.exports = {
  name: 'ember-newrelic',

  contentFor: function(type, config) {
    var content = '';
    var enabled = config.newrelicEnabled || config.environment === 'production';

    // Warn when no snippet found in development regardless of whether new relic
    // is enabled.
    if (config.environment === 'development' && !readSnippet()) {
      console.warn('No New Relic snippet found, run `ember generate newrelic-license <app-name> <api-key>`');
    }

    if (enabled && type === 'head') {
      content = readSnippet();
    }

    return content;
  }
};
