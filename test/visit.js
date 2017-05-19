'use strict';

var assert = require('assert');
var Options = require('..');
var app;

describe('#visit', function() {
  beforeEach(function() {
    app = new Options();
  });

  it('should visit over the given object', function() {
    app.visit('option', {foo: 'bar', baz: 'qux'});
    assert.equal(app.options.foo, 'bar');
    assert.equal(app.options.baz, 'qux');
  });
});
