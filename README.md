# ember-newrelic

Adds `New Relic` tracking to your Ember app.

## Install

```
ember install git+ssh://git@github.com:AltSchool/ember-newrelic.git
```

During the install process the latest New Relic snippet will be placed into `vendor/newrelic-snippet.js`.

## Configure

To enable New Relic integration add the following configuration to `app/config/environment.js`

```
ENV.newRelic = {
  appId: "MY_NEW_RELIC_APP_ID",
  licenseKey: "MY_NEW_RELIC_LICENSE_KEY"
};
```

If you need to update or regenerate your snippet run:

```
ember generate ember-newrelic
```
