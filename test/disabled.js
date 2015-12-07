'use strict';

require('mocha');
var assert = require('assert');
var Options = require('..');
var app;

describe('option disable', function() {
  beforeEach(function() {
    app = new Options();
  });

  describe('#disable()', function() {
    it('should set the value to false', function() {
      app.disable('a');
      assert(app.options.a === false);
    });

    it('should disable a nested value', function() {
      app.disable('a.b.c');
      assert(app.options.a.b.c === false);
    });

    it('should support array syntax', function() {
      app.disable(['a', 'b', 'c']);
      assert(app.options.a.b.c === false);
    });
  });

  describe('#disabled()', function() {
    it('should default to false', function() {
      assert(app.disabled('a'));
    });

    it('should return false when set', function() {
      app.option('a', 'b');
      assert(app.enabled('a'));
      assert(!app.disabled('a'));
    });

    it('should return true when set', function() {
      app.option('a', false);
      assert(!app.enabled('a'));
      assert(app.disabled('a'));
    });
  });
});
