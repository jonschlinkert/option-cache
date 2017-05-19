'use strict';

var assert = require('assert');
var Options = require('..');
var app;

describe('events', function() {
  beforeEach(function() {
    app = new Options();
  });

  describe('#option()', function() {
    it('should emit an event for a key-value pair.', function(cb) {
      var count = 0;
      app.on('option', function(key) {
        count++;
        assert.equal(key, 'a');
      });
      app.option('a', {b: 'c'});
      assert.equal(count, 1);
      cb();
    });

    it('should emit an event for an object.', function(cb) {
      var count = 0;
      app.on('option', function(key) {
        count++;
        assert.equal(key, 'b');
      });
      app.option({b: {d: 'e'}});
      assert.equal(count, 1);
      cb();
    });

    it('should emit for each key on an object', function(cb) {
      var count = 0;
      var keys = [];
      app.on('option', function(key) {
        count++;
        keys.push(key);
      });
      app.option({a: 'b', c: 'd', e: 'f'});
      assert.deepEqual(keys, ['a', 'c', 'e']);
      assert.equal(count, 3);
      cb();
    });
  });
});
