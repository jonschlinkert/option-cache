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

  describe('.set()', function () {
    it('should set a value', function () {
      option.set('a', 'b');
      option.get('a').should.equal('b');
    });

    it('should set properties on the `options` object.', function () {
      option.set('a', 'b');
      option.options.a.should.equal('b');
    });


    it('should use dot notation to `set` values.', function () {
      option.set('h', 'j');
      option.get('h').should.eql('j');
    });

    it('should return `this` for chaining', function () {
      option.set('a', 'b').should.equal(option);
      option
        .set('aa', 'bb')
        .set('bb', 'cc')
        .set('cc', 'dd');
      option.get('aa').should.equal('bb');
      option.get('bb').should.equal('cc');
      option.get('cc').should.equal('dd');
    });

    it('should return undefined when not set', function () {
      option.set('a', undefined).should.equal(option);
    });
  });

  describe('.get()', function () {
    it('should return undefined when no set', function () {
      assert(option.get('a') === undefined);
    });

    it('should otherwise return the value', function () {
      option.set('a', 'b');
      option.get('a').should.equal('b');
    });
  });

});