/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');


function getSnippet(appId, licenseKey) {
  return wrapSnippetInScriptTags([
    readSnippet(),
    generateSnippetConfig(appId, licenseKey)
  ].join('\n'));
}

function readSnippet() {
  try {
    return fs.readFileSync(path.join(process.cwd(), 'vendor/newrelic-snippet.js'), {
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

function generateSnippetConfig(appId, licenseKey) {
  return [
    'NREUM.info = {',
      'applicationID: "'+ appId +'",',
      'licenseKey:    "'+ licenseKey +'"',
    '};'
  ].join('\n');
}

function wrapSnippetInScriptTags(snippet) {
  return [
    '<script type="text/javascript">',
      snippet,
    '</script>'
  ].join('\n');
}


module.exports = {
  name: 'ember-newrelic',

  contentFor: function(type, config) {
    var content = '';
    var newRelicConfig = config.newRelic || {};
    var appId = newRelicConfig.appId;
    var licenseKey = newRelicConfig.licenseKey;
    var enabled = appId && licenseKey;

    if (enabled && type === 'head') {
      content = getSnippet(appId, licenseKey);
    }

    return content;
  }
};
