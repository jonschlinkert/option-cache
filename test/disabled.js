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
var option = new Options();


describe('option get/set', function () {
  afterEach(function() {
    option.clear();
  });

  describe('.disable()', function () {
    it('should set the value to false', function () {
      option.disable('foo').should.equal(option);
      option.get('foo').should.be.false;
    });
  });

  describe('.disabled()', function () {
    it('should default to false', function () {
      option.disabled('xyz').should.be.true;
    });

    it('should return false when set', function () {
      option.set('a', 'b');
      option.disabled('a').should.be.false;
    });

    it('should return true when set', function () {
      option.set('a', false);
      option.disabled('a').should.be.true;
    });
  });

  describe('.disable()', function () {
    it('should set the value to false', function () {
      option.disable('foo').should.equal(option);
      option.get('foo').should.be.false;
    });
  });
  describe('.disabled()', function () {
    it('should set the value to true', function () {
      option.disabled('xyz').should.be.true;
    });

    it('should return false when set', function () {
      option.set('abc', 'xyz');
      option.disabled('abc').should.be.false;
    });
  });
});