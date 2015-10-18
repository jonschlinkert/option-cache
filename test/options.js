'use strict';

var util = require('util');
var assert = require('assert');
var Options = require('..');
var app;

describe('constructor', function () {
  it('should be a function', function () {
    assert(typeof Options === 'function');
  });

  it('should create an instance of Options', function () {
    app = new Options();
    assert(app instanceof Options);
  });

  it('should instantiate without `new`', function () {
    app = Options();
    assert(app instanceof Options);
  });

  it('should load default options from the constructor.', function () {
    app = new Options();
    app.option('a', 'b');
    app.option('c', 'd');
    app.option('e', 'f');
    assert(app.options.hasOwnProperty('a'));
    assert(app.options.hasOwnProperty('c'));
    assert(app.options.hasOwnProperty('e'));
  });

  it('should inherit `Options`', function () {
    function App(options) {
      Options.call(this, options);
    }

    util.inherits(App, Options);
    app = new App();
    assert(app instanceof Options);
    assert(App.super_ === Options);

    app.option('a', 'b');
    app.option('c', 'd');
    app.option('e', 'f');

    assert(app.options.hasOwnProperty('a'));
    assert(app.options.hasOwnProperty('c'));
    assert(app.options.hasOwnProperty('e'));
  });
});
