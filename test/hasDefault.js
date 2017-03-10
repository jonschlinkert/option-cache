'use strict';

require('mocha');
var assert = require('assert');
var Options = require('..');
var app;

describe('#hasDefault', function() {
  beforeEach(function() {
    app = new Options();
  });

  it('should return false if a default does not exist', function() {
    assert(!app.hasDefault('a'));
  });

  it('should return true if a default exists', function() {
    app.default('a', 'b');
    assert(app.hasDefault('a'));
  });

  it('should return true when a default is falsey', function() {
    app.default('a', false);
    app.default('b', null);
    assert(app.hasDefault('a'));
    assert(app.hasDefault('b'));
  });

  it('should return true if a nested default exists', function() {
    app.default('a.b.c', 'd');
    assert(app.defaults.a.b.c === 'd');
    assert(app.hasDefault('a.b.c'));
  });

  it('should return false if a nested default does not exist', function() {
    app.default('a', 'b');
    assert(!app.hasDefault('a.b.c'));
  });
});
