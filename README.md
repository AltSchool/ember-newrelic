# ember-newrelic

Adds `NewRelic` tracking to your Ember app.

## Install

```
ember install git+ssh://git@github.com:AltSchool/ember-newrelic.git
```

## Generate New Relic Snippet

You'll need to obtain an [API key](https://docs.newrelic.com/docs/apis/rest-api-v2/requirements/rest-api-key#viewing) from New Relic in order to run this command. Alternately you can copy and paste 
the contents of the snippet into `vendor/newrelic-snippet.html`.

```
ember generate newrelic-license <app-name> <api-key>
```
