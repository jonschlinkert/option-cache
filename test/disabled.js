'use strict';

require('mocha');
var assert = require('assert');
var Options = require('..');
var app;

describe('option disable', function () {
  beforeEach(function() {
    app = new Options();
  });

  describe('#disable()', function () {
    it('should set the value to false', function () {
      app.disable('a');
      assert(!app.option('a'))
    });
  });

  describe('#disabled()', function () {
    it('should default to false', function () {
      assert(app.disabled('a'));
    });

    it('should return false when set', function () {
      app.option('a', 'b');
      assert(app.enabled('a'));
      assert(!app.disabled('a'))
    });

    it('should return true when set', function () {
      app.option('a', false);
      assert(!app.enabled('a'))
      assert(app.disabled('a'));
    });
  });
});
