/*!
 * options-cache <https://github.com/jonschlinkert/options-cache>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var should = require('should');
var Options = require('..');

var app;

describe('option data', function() {
  beforeEach(function() {
    app = new Options();
  });

  describe('.extend()', function() {
    it('should extend the `cache` object.', function() {
      app
        .option({x: 'x', y: 'y', z: 'z'})
        .option({a: 'a', b: 'b', c: 'c'});

      app.options.should.have.property('a');
      app.options.should.have.property('b');
      app.options.should.have.property('c');
      app.options.should.have.property('x');
      app.options.should.have.property('y');
      app.options.should.have.property('z');
    });

  });

  describe('when a string is passed as the first param.', function() {
    it('should extend that property on the cache.', function() {
      app
        .option('foo', {x: 'x', y: 'y', z: 'z'})
        .option('bar', {a: 'a', b: 'b', c: 'c'});

      app.option('bar').should.have.property('a');
      app.option('bar').should.have.property('b');
      app.option('bar').should.have.property('c');
      app.option('foo').should.have.property('x');
      app.option('foo').should.have.property('y');
      app.option('foo').should.have.property('z');
    });


    it('should extend the `cache.data` object.', function() {
      app.option('data', {
        x: 'x',
        y: 'y',
        z: 'z',
        a: 'a',
        b: 'b',
        c: 'c'
      });

      app.option('data').should.have.property('a');
      app.option('data').should.have.property('b');
      app.option('data').should.have.property('c');
      app.option('data').should.have.property('x');
      app.option('data').should.have.property('y');
      app.option('data').should.have.property('z');
    });
  });

});
