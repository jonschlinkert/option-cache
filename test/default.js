'use strict';

var assert = require('assert');
var Options = require('..');
var app;

describe('#default()', function() {
  describe('method', function() {
    beforeEach(function() {
      app = new Options();
    });

    it('should expose a default method', function() {
      assert.equal(typeof app.default, 'function');
    });

    it('should be chainable.', function() {
      app
        .default({x: 'xxx', y: 'yyy', z: 'zzz'})
        .default({a: 'aaa', b: 'bbb', c: 'ccc'});

      assert.equal(app.default('x'), 'xxx');
      assert.equal(app.default('a'), 'aaa');
    });
  });

  describe('errors', function() {
    beforeEach(function() {
      app = new Options();
    });

    it('should throw when invalid args are passed', function(done) {
      try {
        app.default(null);
        done(new Error('expected an error.'));
      } catch (err) {
        assert(err);
        assert(err.message);
        assert.equal(err.message, 'expected default to be a string or object');
        done();
      }
    });
  });

  describe('set', function() {
    beforeEach(function() {
      app = new Options();
    });

    it('should set a default from a key-value pair.', function() {
      app.default('a', {b: 'c'});
      assert.deepEqual(app.default('a'), {b: 'c'});
    });

    it('should set a nested property.', function() {
      app.default('a.b.c', {d: 'e'});
      assert.deepEqual(app.defaults.a, {b: {c: {d: 'e'}}});
    });

    it('should support passing an array as the key', function() {
      app.default(['a', 'b'], {c: 'd'});
      assert.equal(app.default(['a', 'b', 'c']), 'd');
    });

    it('should set a default from an object.', function() {
      app.default({b: {d: 'e'}});
      assert.deepEqual(app.default('b'), {d: 'e'});
    });

    it('should set properties from an object.', function() {
      app.default({a: 'b', c: 'd', e: 'f'});
      assert(app.defaults.hasOwnProperty('a'));
      assert(app.defaults.hasOwnProperty('c'));
      assert(app.defaults.hasOwnProperty('e'));
    });

    it('should set a list of values', function() {
      app.default({g: 'h'}, {i: 'j'}, {k: 'l'});
      assert(app.defaults.hasOwnProperty('g'));
      assert(app.defaults.g === 'h');
      assert(app.defaults.hasOwnProperty('i'));
      assert(app.defaults.i === 'j');
      assert(app.defaults.hasOwnProperty('k'));
      assert(app.defaults.k === 'l');
    });

    it('should set an array of values', function() {
      app.default([{g: 'h'}, {i: 'j'}, {k: 'l'}]);
      assert(app.defaults.hasOwnProperty('g'));
      assert(app.defaults.g === 'h');
      assert(app.defaults.hasOwnProperty('i'));
      assert(app.defaults.i === 'j');
      assert(app.defaults.hasOwnProperty('k'));
      assert(app.defaults.k === 'l');
    });

    it('should set a list of defaults', function() {
      app.default({a: 'b'}, {c: 'd'}, {e: 'f'});
      assert(app.defaults.hasOwnProperty('a'));
      assert(app.defaults.hasOwnProperty('c'));
      assert(app.defaults.hasOwnProperty('e'));
    });

    it('should set a default.', function() {
      app.default('a', 'b');
      assert(app.defaults.hasOwnProperty('a'));
    });
  });

  describe('get', function() {
    beforeEach(function() {
      app = new Options();
    });

    it('should return undefined when key is not specified', function() {
      assert.equal(typeof app.default(), 'undefined');
    });

    it('should get a default.', function() {
      app.default('a', 'b');
      assert.equal(app.default('a'), 'b');
    });

    it('should get a nested property.', function() {
      app.default('a.b.c', {d: 'e'});
      assert.deepEqual(app.default('a'), {b: {c: {d: 'e'}}});
      assert.deepEqual(app.default('a.b'), {c: {d: 'e'}});
      assert.deepEqual(app.default('a.b.c'), {d: 'e'});
    });

    it('should support passing an array as the key', function() {
      app.default({a: {b: {c: 'd'}}});
      assert.equal(app.default(['a', 'b', 'c']), 'd');
    });

    it('should get a default value if option is not set', function() {
      app.option({a: 'aaa', b: 'bbb', c: 'ccc'});
      app.default({a: 'AAA', x: 'xxx', y: 'yyy', z: 'zzz'});
      assert.equal(app.option('a'), 'aaa');
      assert.equal(app.option('x'), 'xxx');
    });

    it('should get a nested default value if the option is not set', function() {
      app.option('a.b.c', {d: 'e'});
      app.default('z.y.x', {w: 'v'});
      assert.deepEqual(app.option('z'), {y: {x: {w: 'v'}}});
      assert.deepEqual(app.option('z.y'), {x: {w: 'v'}});
      assert.deepEqual(app.option('z.y.x'), {w: 'v'});
    });
  });

  describe('extend', function() {
    beforeEach(function() {
      app = new Options();
    });

    it('should extend the `defaults` object.', function() {
      app.default({x: 'xxx', y: 'yyy', z: 'zzz'});
      assert.equal(app.default('x'), 'xxx');
      assert.equal(app.default('y'), 'yyy');
      assert.equal(app.default('z'), 'zzz');
    });

    it('defaults should be on the `defaults` object.', function() {
      app.default({x: 'xxx', y: 'yyy', z: 'zzz'});
      assert.equal(app.defaults.x, 'xxx');
      assert.equal(app.defaults.y, 'yyy');
      assert.equal(app.defaults.z, 'zzz');
    });

    it('should extend the `defaults` object when the first param is a string.', function() {
      app.default('foo', {x: 'xxx', y: 'yyy', z: 'zzz'});
      app.default('bar', {a: 'aaa', b: 'bbb', c: 'ccc'});

      assert(app.default('foo').hasOwnProperty('x'));
      assert(app.default('bar').hasOwnProperty('a'));

      assert(app.defaults.foo.hasOwnProperty('x'));
      assert(app.defaults.bar.hasOwnProperty('a'));
    });

    it('should extend the `defaults` object.', function() {
      app.default({x: 'x', y: 'y', z: 'z'});
      app.default({a: 'a', b: 'b', c: 'c'});

      assert(app.defaults.hasOwnProperty('a'));
      assert(app.defaults.hasOwnProperty('b'));
      assert(app.defaults.hasOwnProperty('c'));
      assert(app.defaults.hasOwnProperty('x'));
      assert(app.defaults.hasOwnProperty('y'));
      assert(app.defaults.hasOwnProperty('z'));
    });

    it('should work with string-object', function() {
      app.default('foo', {x: 'x', y: 'y', z: 'z'});
      app.default('bar', {a: 'a', b: 'b', c: 'c'});
      assert(app.default('bar').hasOwnProperty('a'));
      assert(app.default('bar').hasOwnProperty('b'));
      assert(app.default('bar').hasOwnProperty('c'));
      assert(app.default('foo').hasOwnProperty('x'));
      assert(app.default('foo').hasOwnProperty('y'));
      assert(app.default('foo').hasOwnProperty('z'));

      app.default('data', {
        x: 'x',
        y: 'y',
        z: 'z',
        a: 'a',
        b: 'b',
        c: 'c'
      });

      assert(app.default('data').hasOwnProperty('a'));
      assert(app.default('data').hasOwnProperty('b'));
      assert(app.default('data').hasOwnProperty('c'));
      assert(app.default('data').hasOwnProperty('x'));
      assert(app.default('data').hasOwnProperty('y'));
      assert(app.default('data').hasOwnProperty('z'));
    });
  });
});

