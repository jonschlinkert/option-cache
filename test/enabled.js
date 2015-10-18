'use strict';

var assert = require('assert');
var Options = require('..');
var app;

describe('#enabled', function () {
  beforeEach(function() {
    app = new Options();
  });

  describe('#enable()', function () {
    it('should set the value to true', function () {
      app.enable('a');
      assert(app.option('a'));
      assert(app.enabled('a'));
    });
  });

  describe('#enabled()', function () {
    it('should default to false', function () {
      // make sure it's disabled
      assert(!app.enabled('a'));
      // enable it
      app.enable('a');
      assert(app.enabled('a'));
    });

    it('should return true when any value is set', function () {
      app.option('a', 'b');
      assert(app.enabled('a'));
    });

    it('should return true when set', function () {
      app.option('a', false);
      assert(!app.enabled('a'));
    });
  });
});
