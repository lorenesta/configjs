
var defer = require('../../defer').deferConfig;

var config = {
  value: 'value',
  siteTitle : 'Site title',
  latitude  : 1,
  longitude : 2,
  a: defer(function (cfg) {
    return 'my '+cfg.b;
  }),
  b: defer(function () {
    return this.value;
  }),
  c: defer(function (cfg) {
    return this.a+' '+cfg.b;
  }),
  fromList: defer(function() {
    return this.list[2]+2;
  }),
  list: [
    1,
    'b',
    defer(function (cfg) {
      return cfg.latitude+cfg.longitude;
    })
  ]
};

// Set up a default value which refers to another value.
// The resolution of the value is deferred until all the config files have been loaded
// So that if 'config.siteTitle' is overridden, this will point to the correct value.
config.welcomeEmail = {
  subject :  defer(function (cfg) {
    return "Welcome to "+cfg.siteTitle;
  }),
  // A plain function should be not disturbed.
  aFunc  : function () {
    return "Still just a function.";
  },

  // Look ma, no arg passing. The main config object is bound to 'this'
  justThis: defer(function () {
    return "Welcome to this "+this.siteTitle;
  }),
};

config.map = {
  centerPoint : defer(function () {
    return { lat: this.latitude, lon: this.longitude };
  }),
};

config.original = {
  // An original value passed to deferred function
  original: "an original value",

  // A deferred function "skipped" by next deferred function
  deferredOriginal: defer(function(cfg, original) {
    return "this will not be used";
  }),
};

module.exports = config;
