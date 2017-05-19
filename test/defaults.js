'use strict';

var assert = require('assert');
var Options = require('..');
var app;

describe('#default()', function() {
  beforeEach(function() {
    app = new Options();
  });

  it('should expose a default method', function() {
    assert.equal(typeof app.default, 'function');
  });

  it('should throw an error on invalid args', function() {
    assert.throws(function() {
      app.default([]);
    });
    assert.throws(function() {
      app.default(null);
    });
  });

  it('should extend an object onto app.defaults', function() {
    app.default({foo: 'a', bar: 'b'});
    assert.deepEqual(app.defaults, {foo: 'a', bar: 'b'});
  });

  it('should set a default on app.defaults', function() {
    app.default('foo', 'a');
    assert.deepEqual(app.default('foo'), 'a');
  });

  it('should get a default from app.defaults', function() {
    app.default({foo: 'a', bar: 'b'});
    assert.deepEqual(app.default('foo'), 'a');
  });

  it('should get a default with app.option()', function() {
    app.default({foo: 'a', bar: 'b'});
    assert.deepEqual(app.option('foo'), 'a');
  });

  it('should get an option that is null', function() {
    app.default('foo', 'a');
    app.option('foo', null);
    assert.deepEqual(app.option('foo'), null);
  });

  it('should get the default when option defined as undefined', function() {
    app.default('foo', 'a');
    app.option('foo', undefined);
    assert.deepEqual(app.option('foo'), 'a');
  });
});

