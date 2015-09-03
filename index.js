/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');


function readSnippet() {
  try {
    return fs.readFileSync(path.join(process.cwd(), 'vendor/new-relic-snippet.html'), {
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

    if (config.environment !== 'test' && type === 'head') {
      var content = readSnippet();

      if (!content) {
        console.warn('New Relic disabled: no snippet found, run `ember generate newrelic-license <app-name> <api-key>`');
      }
    }

    return content;
  }
};
