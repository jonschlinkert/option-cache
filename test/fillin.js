'use strict';

var assert = require('assert');
var Options = require('..');
var app;

describe('#fillin()', function() {
  describe('method', function() {
    beforeEach(function() {
      app = new Options();
    });

    it('should expose an fillins method', function() {
      assert.equal(typeof app.fillin, 'function');
    });

    it('should be chainable.', function() {
      app
        .fillin({x: 'xxx', y: 'yyy', z: 'zzz'})
        .fillin({a: 'aaa', b: 'bbb', c: 'ccc'});

      assert.equal(app.option('x'), 'xxx');
      assert.equal(app.option('a'), 'aaa');
    });
  });

  describe('errors', function() {
    beforeEach(function() {
      app = new Options();
    });

    it('should throw when invalid args are passed', function(done) {
      try {
        app.fillin(null);
        done(new Error('expected an error.'));
      } catch (err) {
        assert(err);
        assert(err.message);
        assert(err.message === 'expected option to be a string, object or array');
        done();
      }
    });
  });

  describe('set', function() {
    beforeEach(function() {
      app = new Options();
    });

    it('should fill-in missing values from a key-value pair.', function() {
      app.option('a', {b: 'c'});

      app.fillin('a', {x: 'z'});
      app.fillin('c', {d: 'e'});

      assert.deepEqual(app.option('a'), {b: 'c'});
      assert.deepEqual(app.option('c'), {d: 'e'});
    });

    it('should fill in a nested property.', function() {
      app.option('a.b.c', {d: 'e'});
      app.fillin('a.b.c.g', 'h');
      assert.deepEqual(app.options.a, {b: {c: {d: 'e', g: 'h'}}});
    });

    it('should fill in missing values from an object.', function() {
      app.option({a: {b: 'c'}});
      app.fillin('a.d', 'e');
      assert.deepEqual(app.option('a.b'), 'c');
      assert.deepEqual(app.option('a.d'), 'e');
    });

    it('should not overwrite existing, deeply nested values', function() {
      app.option({a: {b: 'c'}});
      app.fillin('a.d', 'e');
      app.fillin('a.b', 'd');
      assert.deepEqual(app.option('a.b'), 'c');
      assert.deepEqual(app.option('a.d'), 'e');
    });

    it('should merge an object onto app.options', function() {
      app.fillin({a: 'b', c: 'd', e: 'f'});
      assert(app.options.hasOwnProperty('a'));
      assert(app.options.hasOwnProperty('c'));
      assert(app.options.hasOwnProperty('e'));
    });

    it('should set a key-value pair.', function() {
      app.fillin('a', 'b');
      assert(app.options.hasOwnProperty('a'));
      assert.equal(app.option('a'), 'b');
    });

    it('should overwrite an undefined value', function() {
      app.option('a', undefined);
      app.fillin('a', 'b');
      assert(app.options.hasOwnProperty('a'));
      assert.equal(app.option('a'), 'b');
    });

    it('should not overwrite an existing string value', function() {
      app.option('a', 'b');
      app.fillin('a', 'c');
      assert.equal(app.option('a'), 'b');
    });

    it('should overwrite the value when the type does not match', function() {
      app.option('a', 'b');
      app.fillin('a', {b: 'c'}, 'object');
      assert.deepEqual(app.option('a'), {b: 'c'});
    });

    it('should not overwrite an existing null value', function() {
      app.option('a', null);
      app.fillin('a', 'c');
      assert.equal(app.option('a'), null);
    });

    it('should set a nested object.', function() {
      app.fillin('a.b.c', {d: 'e'});
      assert.deepEqual(app.option('a.b.c.d'), 'e');
    });
  });
});

