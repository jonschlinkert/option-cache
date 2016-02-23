'use strict';

var assert = require('assert');
var Options = require('..');
var app;

describe('#option()', function() {
  describe('setOption', function() {
    beforeEach(function() {
      app = new Options();
    });

    it('should set an option from a key-value pair.', function() {
      app.setOption('a', {b: 'c'});
      assert.deepEqual(app.setOption('a'), {b: 'c'});
    });

    it('should set a nested property.', function() {
      app.setOption('a.b.c', {d: 'e'});
      assert.deepEqual(app.options.a, {b: {c: {d: 'e'}}});
    });

    it('should get a nested property.', function() {
      app.setOption('a.b.c', {d: 'e'});
      assert.deepEqual(app.setOption('a.b.c.d'), 'e');
    });

    it('should set an option.', function() {
      app.setOption('a', 'b');
      assert(app.options.hasOwnProperty('a'));
    });
  });

  describe('getOption', function() {
    beforeEach(function() {
      app = new Options();
    });

    it('should get an option.', function() {
      app.setOption('a', 'b');
      assert.equal(app.getOption('a'), 'b');
    });

    it('should get a nested property.', function() {
      app.setOption('a.b.c', {d: 'e'});
      assert.deepEqual(app.getOption('a'), {b: {c: {d: 'e'}}});
      assert.deepEqual(app.getOption('a.b'), {c: {d: 'e'}});
      assert.deepEqual(app.getOption('a.b.c'), {d: 'e'});
    });
  });
});

