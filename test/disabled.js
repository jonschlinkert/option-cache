/*!
 * options-cache <https://github.com/jonschlinkert/options-cache>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var assert = require('assert');
var should = require('should');
var Options = require('..');

var app;

describe('option disable', function () {
  beforeEach(function() {
    app = new Options();
  });

  describe('.disable()', function () {
    it('should set the value to false', function () {
      app.disable('a');
      app.option('a').should.be.false;
    });
  });

  describe('.disabled()', function () {
    it('should default to false', function () {
      app.disabled('a').should.be.true;
    });

    it('should return false when set', function () {
      app.option('a', 'b');
      app.enabled('a').should.be.true;
      app.disabled('a').should.be.false;
    });

    it('should return true when set', function () {
      app.option('a', false);
      app.enabled('a').should.be.false;
      app.disabled('a').should.be.true;
    });
  });
});