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

describe('reversed options', function () {
  beforeEach(function() {
    app = new Options();
  });

  describe('reverse .option()', function () {
    it('should reverse an option from `true` to `false`.', function () {
      app.option('a', true);
      app.option('a').should.be.true;
      app.enabled('a').should.be.true;
      app.disabled('a').should.be.false;

      app.reverse('a');

      app.option('a').should.be.false;
      app.enabled('a').should.be.false;
      app.disabled('a').should.be.true;

      app.reverse('a');
      app.option('a').should.be.true;
      app.enabled('a').should.be.true;
      app.disabled('a').should.be.false;
    });

    it('should reverse an option from `false` to `true`.', function () {
      app.option('a', false);
      app.option('a').should.be.false;
      app.enabled('a').should.be.false;
      app.disabled('a').should.be.true;

      app.reverse('a');

      app.option('a').should.be.true;
      app.enabled('a').should.be.true;
      app.disabled('a').should.be.false;

      app.reverse('a');
      app.option('a').should.be.false;
      app.enabled('a').should.be.false;
      app.disabled('a').should.be.true;
    });

    it('should reverse an option when `no` prefixes the key.', function () {
      app.option('a', true);
      app.option('a').should.be.true;
      app.option('noa', true);
      app.option('noa').should.be.true;
      app.option('a').should.be.false;
      app.should.eql({options: { a: false, noa: true }});
    });

    it('should not reverse an option prefixed with `no` when `noreverse` is true.', function () {
      app.option('noreverse', true);
      app.option('a', true);
      app.option('a').should.be.true;
      app.option('noa', true);
      app.option('noa').should.be.true;
      app.option('a').should.be.true;
    });

    it('should not reverse an option using `reverse` when `noreverse` is true.', function () {
      app.option('noreverse', true);
      app.option('a', true);
      app.option('a').should.be.true;
      app.reverse('a');
      app.option('a').should.be.true;
    });

    it('should return `true` if the key is reversed.', function () {
      app.isReversed('a').should.be.false;
      app.isReversed('noa').should.be.true;
    });

    it('should only reverse keys with length greater than 2.', function () {
      app.isReversed('no').should.be.false;
    });
  });
});