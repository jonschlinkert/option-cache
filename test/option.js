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

describe('option', function () {
  beforeEach(function() {
    app = new Options();
  });

  describe('.option()', function () {
    it('should set an option from a key-value pair.', function () {
      app.option('a', {b: 'c'});
      app.option('a').should.eql({b: 'c'});
    });

    it('should set an option from an object.', function () {
      app.option({b: {d: 'e'}});
      app.option('b').should.eql({d: 'e'});
    });

    it('should set multiple options from an object.', function () {
      app.option({a: 'b', c: 'd', e: 'f'});
      app.options.should.have.properties(['a', 'c', 'e']);
      app.options.should.have.property('a', 'b');
      app.options.should.have.property('c', 'd');
      app.options.should.have.property('e', 'f');
    });
    it('should set options from multiple objects.', function () {
      app.option({a: 'b'}, {c: 'd'}, {e: 'f'});
      app.options.should.have.properties(['a', 'c', 'e']);
      app.options.should.have.property('a', 'b');
      app.options.should.have.property('c', 'd');
      app.options.should.have.property('e', 'f');
    });
  });

  // describe('.disabled()', function () {
  //   it('should default to false', function () {
  //     app.disabled('a').should.be.true;
  //   });

  //   it('should return false when set', function () {
  //     app.option('a', 'b');
  //     app.enabled('a').should.be.true;
  //     app.disabled('a').should.be.false;
  //   });

  //   it('should return true when set', function () {
  //     app.option('a', false);
  //     app.enabled('a').should.be.false;
  //     app.disabled('a').should.be.true;
  //   });
  // });
});