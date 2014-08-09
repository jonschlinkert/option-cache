/*!
 * options-cache <https://github.com/jonschlinkert/options-cache>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var should = require('should');
var Options = require('..');
var option = new Options();

describe('option data', function() {
  beforeEach(function() {
    option.clear();
  });

  describe('.extend()', function() {
    it('should extend the `cache` object.', function() {
      option
        .extend({x: 'x', y: 'y', z: 'z'})
        .extend({a: 'a', b: 'b', c: 'c'});
      option.get().should.have.property('a');
      option.get().should.have.property('b');
      option.get().should.have.property('c');
      option.get().should.have.property('x');
      option.get().should.have.property('y');
      option.get().should.have.property('z');
    });

  });

  describe('when a string is passed as the first param.', function() {
    it('should extend that property on the cache.', function() {
      option
        .extend('foo', {x: 'x', y: 'y', z: 'z'})
        .extend('bar', {a: 'a', b: 'b', c: 'c'});

      option.get('bar').should.have.property('a');
      option.get('bar').should.have.property('b');
      option.get('bar').should.have.property('c');
      option.get('foo').should.have.property('x');
      option.get('foo').should.have.property('y');
      option.get('foo').should.have.property('z');
    });


    it('should extend the `cache.data` object.', function() {
      option
        .extend('data', {x: 'x', y: 'y', z: 'z', a: 'a', b: 'b', c: 'c'})

      option.get('data').should.have.property('a');
      option.get('data').should.have.property('b');
      option.get('data').should.have.property('c');
      option.get('data').should.have.property('x');
      option.get('data').should.have.property('y');
      option.get('data').should.have.property('z');
    });
  });

});
