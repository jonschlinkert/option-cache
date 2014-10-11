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

describe('option enabled', function () {
  beforeEach(function() {
    app = new Options();
  });

  describe('.enable()', function () {
    it('should set the value to true', function () {
      app.enable('a');
      app.option('a').should.be.true;
      app.enabled('a').should.be.true;
    });
  });

  describe('.enabled()', function () {
    it('should default to false', function () {
      app.enabled('a').should.be.false;
      // then enable it
      app.enable('a');
      app.enabled('a').should.be.true;
    });

    it('should return true when any value is set', function () {
      app.option('a', 'b');
      app.enabled('a').should.be.true;
    });

    it('should return true when set', function () {
      app.option('a', false);
      app.enabled('a').should.be.false;
    });
  });
});