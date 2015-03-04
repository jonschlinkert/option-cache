/*!
 * option-cache <https://github.com/jonschlinkert/option-cache>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var assert = require('assert');
var should = require('should');
var Options = require('..');

var app;

describe('option isBoolean', function () {
  beforeEach(function() {
    app = new Options();
  });

  describe('.isBoolean()', function () {
    it('should return false if the value is not boolean', function () {
      app.option('a', 'b');
      app.isBoolean('a').should.be.false;
    });

    it('should return true if the value is boolean', function () {
      app.option('a', true);
      app.isBoolean('a').should.be.true;
      app.enable('b');
      app.isBoolean('b').should.be.true;
    });

    it('should return true if the value is `true`', function () {
      app.option('a', true);
      app.isTrue('a').should.be.true;
      app.enable('b');
      app.isTrue('b').should.be.true;
    });

    it('should return false if the value is `false`', function () {
      app.option('a', true);
      app.isFalse('a').should.be.false;
      app.enable('b');
      app.isFalse('b').should.be.false;
    });

    it('should work for values that do not exist:', function () {
      app.isBoolean('abc').should.be.false;
      app.isTrue('abc').should.be.false;
      app.isFalse('xyz').should.be.false;
    });
  });
});