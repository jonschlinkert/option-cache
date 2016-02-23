'use strict';

var assert = require('assert');
var Options = require('..');
var app;

describe('#option()', function() {
  describe('method', function() {
    beforeEach(function() {
      app = new Options();
    });

    it('should expose an options method', function() {
      assert.equal(typeof app.option, 'function');
    });

    it('should be chainable.', function() {
      app.option
        .merge({x: 'xxx', y: 'yyy', z: 'zzz'})
        .merge({a: 'aaa', b: 'bbb', c: 'ccc'});

      assert.equal(app.option.merge('x'), 'xxx');
      assert.equal(app.option.merge('a'), 'aaa');
    });
  });

  describe('errors', function() {
    beforeEach(function() {
      app = new Options();
    });

    it('should throw when invalid args are passed', function(done) {
      try {
        app.option.merge(null);
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

    it('should set an option from a key-value pair.', function() {
      app.option.merge('a', {b: 'c'});
      assert.deepEqual(app.option.merge('a'), {b: 'c'});
    });

    it('should support passing an array as the key', function() {
      app.option.merge({a: {b: {c: 'd'}}});
      assert.equal(app.option.merge(['a', 'b', 'c']), 'd');
    });

    it('should set a nested property.', function() {
      app.option.merge('a.b.c', {d: 'e'});
      assert.deepEqual(app.options.a, {b: {c: {d: 'e'}}});
    });

    it('should get a nested property.', function() {
      app.option.merge('a.b.c', {d: 'e'});
      assert.deepEqual(app.option.merge('a.b.c.d'), 'e');
    });

    it('should set an option from an object.', function() {
      app.option.merge({b: {d: 'e'}});
      assert.deepEqual(app.option.merge('b'), {d: 'e'});
    });

    it('should set properties from an object.', function() {
      app.option.merge({a: 'b', c: 'd', e: 'f'});
      assert(app.options.hasOwnProperty('a'));
      assert(app.options.hasOwnProperty('c'));
      assert(app.options.hasOwnProperty('e'));
    });

    it('should set a list of values', function() {
      app.option.merge({g: 'h'}, {i: 'j'}, {k: 'l'});
      assert(app.options.hasOwnProperty('g'));
      assert(app.options.g === 'h');
      assert(app.options.hasOwnProperty('i'));
      assert(app.options.i === 'j');
      assert(app.options.hasOwnProperty('k'));
      assert(app.options.k === 'l');
    });

    it('should set an array of values', function() {
      app.option.merge([{g: 'h'}, {i: 'j'}, {k: 'l'}]);
      assert(app.options.hasOwnProperty('g'));
      assert(app.options.g === 'h');
      assert(app.options.hasOwnProperty('i'));
      assert(app.options.i === 'j');
      assert(app.options.hasOwnProperty('k'));
      assert(app.options.k === 'l');
    });

    it('should set a list of options', function() {
      app.option.merge({a: 'b'}, {c: 'd'}, {e: 'f'});
      assert(app.options.hasOwnProperty('a'));
      assert(app.options.hasOwnProperty('c'));
      assert(app.options.hasOwnProperty('e'));
    });

    it('should set an option.', function() {
      app.option.merge('a', 'b');
      assert(app.options.hasOwnProperty('a'));
    });
  });

  describe('get', function() {
    beforeEach(function() {
      app = new Options();
    });

    it('should get an option.', function() {
      app.option.merge('a', 'b');
      assert.equal(app.option.merge('a'), 'b');
    });

    it('should get a nested property.', function() {
      app.option.merge('a.b.c', {d: 'e'});
      assert.deepEqual(app.option.merge('a'), {b: {c: {d: 'e'}}});
      assert.deepEqual(app.option.merge('a.b'), {c: {d: 'e'}});
      assert.deepEqual(app.option.merge('a.b.c'), {d: 'e'});
    });
  });

  describe('extend', function() {
    beforeEach(function() {
      app = new Options();
    });

    it('should extend the `options` object.', function() {
      app.option.merge({x: 'xxx', y: 'yyy', z: 'zzz'});
      assert.equal(app.option.merge('x'), 'xxx');
      assert.equal(app.option.merge('y'), 'yyy');
      assert.equal(app.option.merge('z'), 'zzz');
    });

    it('options should be on the `options` object.', function() {
      app.option.merge({x: 'xxx', y: 'yyy', z: 'zzz'});
      assert.equal(app.options.x, 'xxx');
      assert.equal(app.options.y, 'yyy');
      assert.equal(app.options.z, 'zzz');
    });

    it('should extend the `options` object when the first param is a string.', function() {
      app.option.merge('foo', {x: 'xxx', y: 'yyy', z: 'zzz'});
      app.option.merge('bar', {a: 'aaa', b: 'bbb', c: 'ccc'});

      assert(app.option.merge('foo').hasOwnProperty('x'));
      assert(app.option.merge('bar').hasOwnProperty('a'));

      assert(app.options.foo.hasOwnProperty('x'));
      assert(app.options.bar.hasOwnProperty('a'));
    });

    it('should extend the `cache` object.', function() {
      app.option.merge({x: 'x', y: 'y', z: 'z'});
      app.option.merge({a: 'a', b: 'b', c: 'c'});

      assert(app.options.hasOwnProperty('a'));
      assert(app.options.hasOwnProperty('b'));
      assert(app.options.hasOwnProperty('c'));
      assert(app.options.hasOwnProperty('x'));
      assert(app.options.hasOwnProperty('y'));
      assert(app.options.hasOwnProperty('z'));
    });

    it('should work with string-object', function() {
      app.option.merge('foo', {x: 'x', y: 'y', z: 'z'});
      app.option.merge('bar', {a: 'a', b: 'b', c: 'c'});
      assert(app.option.merge('bar').hasOwnProperty('a'));
      assert(app.option.merge('bar').hasOwnProperty('b'));
      assert(app.option.merge('bar').hasOwnProperty('c'));
      assert(app.option.merge('foo').hasOwnProperty('x'));
      assert(app.option.merge('foo').hasOwnProperty('y'));
      assert(app.option.merge('foo').hasOwnProperty('z'));

      app.option.merge('data', {
        x: 'x',
        y: 'y',
        z: 'z',
        a: 'a',
        b: 'b',
        c: 'c'
      });

      assert(app.option.merge('data').hasOwnProperty('a'));
      assert(app.option.merge('data').hasOwnProperty('b'));
      assert(app.option.merge('data').hasOwnProperty('c'));
      assert(app.option.merge('data').hasOwnProperty('x'));
      assert(app.option.merge('data').hasOwnProperty('y'));
      assert(app.option.merge('data').hasOwnProperty('z'));
    });
  });
});

