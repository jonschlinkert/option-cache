'use strict';

var assert = require('assert');
var Options = require('..');
var app;

describe('option isBoolean', function() {
  beforeEach(function() {
    app = new Options();
  });

  describe('#isBoolean()', function() {
    it('should return false if the value is not boolean', function() {
      app.option('a', 'b');
      assert(!app.isBoolean('a'));
    });

    it('should return true if the value is boolean', function() {
      app.option('a', true);
      assert(app.isBoolean('a'));
      app.enable('b');
      assert(app.isBoolean('b'));
    });

    it('should take a list of args', function() {
      app.option('a.b', true);
      assert(app.isBoolean('a', 'b'));
      app.disable('c.d');
      assert(app.isBoolean('c', 'd'));
    });

    it('should take an array of args', function() {
      app.option('a.b', true);
      assert(app.isBoolean(['a', 'b']));
      app.disable('c.d');
      assert(app.isBoolean(['c', 'd']));
    });

    it('should return true if the value is `true`', function() {
      app.option('a', true);
      assert(app.isTrue('a'));
      app.enable('b');
      assert(app.isTrue('b'));
    });

    it('should return false if the value is `false`', function() {
      app.option('a', true);
      assert(!app.isFalse('a'));
      app.enable('b');
      assert(!app.isFalse('b'));
    });

    it('should work for values that do not exist:', function() {
      assert(!app.isBoolean('abc'));
      assert(!app.isTrue('abc'));
      assert(!app.isFalse('xyz'));
    });
  });
});
