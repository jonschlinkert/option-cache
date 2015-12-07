'use strict';

var assert = require('assert');
var Options = require('..');
var app;

describe('events', function() {
  beforeEach(function() {
    app = new Options();
  });

  describe('#option()', function() {
    it('should emit an event for a key-value pair.', function() {
      app.on('option', function(key) {
        assert.equal(key, 'a');
      });
      app.option('a', {b: 'c'});
    });

    it('should emit an event for an object.', function() {
      app.on('option', function(key) {
        assert.equal(key, 'b');
      });
      app.option({b: {d: 'e'}});
    });

    it('should set multiple options from an object.', function() {
      var keys = [];
      app.on('option', function(key) {
        keys.push(key);
      });
      app.option({a: 'b', c: 'd', e: 'f'});
      assert.deepEqual(keys, ['a', 'c', 'e']);
    });

    it('should emit an event with the keys from a list of objects.', function() {
      var keys = [];
      app.on('option', function(key) {
        keys.push(key);
      });
      app.option({a: 'b'}, {c: 'd'}, {e: 'f'});
      assert.deepEqual(keys, ['a', 'c', 'e']);
    });
  });
});
