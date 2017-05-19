'use strict';

var assert = require('assert');
var Options = require('..');
var app;

describe('#either()', function() {
  beforeEach(function() {
    app = new Options();
  });

  it('should expose an either method', function() {
    assert.equal(typeof app.either, 'function');
  });

  it('should return an existing value', function() {
    app.option('admin', true);
    assert.equal(app.either('admin', false), true);
  });

  it('should return the fallback value', function() {
    assert.equal(app.either('collaborator', false), false);
  });

  it('should return the fallback if option type is not the same', function() {
    app.option('admin', 'true');
    assert.equal(app.either('admin', false, 'boolean'), false);
  });
});

