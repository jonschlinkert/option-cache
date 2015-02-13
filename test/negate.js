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

describe('invertd options', function () {
  beforeEach(function() {
    app = new Options();
  });

  describe('negate .option()', function () {
    it('should negate a boolean option.', function () {
      app.enable('a');
      app.option('a').should.be.true;
      app.enabled('a').should.be.true;

      app.option('no-a').should.be.true;
      app.option('no-a', true).should.be.true;
      app.option('no-a', false).should.be.false;
      app.enabled('a').should.be.false;
    });

    it('should allow a custom prefix to be defined.', function () {
      app._no = 'foo';

      app.enable('a');
      app.option('a').should.be.true;
      app.enabled('a').should.be.true;

      app.option('fooa').should.be.true;
      app.enabled('a').should.be.false;

      app._no = 'no-';
    });
  });
});