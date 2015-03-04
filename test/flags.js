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

describe('flags', function () {
  beforeEach(function() {
    app = new Options();
  });

  describe('.flags()', function () {
    it('should format the given options as command line args:', function () {
      app.enable('abc');
      app.enable('one');
      app.enable('two');
      app.option('foo', 'bar');
      app.flags(['abc', 'foo']).should.eql(['--abc', '--foo=bar']);
    });

    it('should format a boolean option as a command line arg:', function () {
      app.enable('abc');
      app.flags(['abc']).should.eql(['--abc']);
    });

    it('should format an option as a command line arg:', function () {
      app.option('abc', 'xyz');
      app.flags(['abc']).should.eql(['--abc=xyz']);
    });

    it('should format all options as command line args:', function () {
      app.enable('a');
      app.enable('z');
      app.option('b', 'c');
      app.option('d', 'e');
      app.flags().should.eql(['--a', '--z', '--b=c', '--d=e']);
    });
  });
});