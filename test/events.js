/*!
 * option-cache <https://github.com/jonschlinkert/option-cache>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

/* deps: mocha */
var assert = require('assert');
var should = require('should');
var Options = require('..');

var app;

describe('events', function () {
  beforeEach(function() {
    app = new Options();
  });

  describe('.option()', function () {
    it('should emit an event for a key-value pair.', function () {
      app.on('option', function (keys) {
        keys.should.eql(['a']);
      });
      app.option('a', {b: 'c'});
    });

    it('should emit an event for an object.', function () {
      app.on('option', function (keys) {
        keys.should.eql(['b']);
      });
      app.option({b: {d: 'e'}});
    });

    it('should set multiple options from an object.', function () {
      app.on('option', function (keys) {
        keys.should.eql(['a', 'c', 'e']);
      });
      app.option({a: 'b', c: 'd', e: 'f'});
    });

    it('should emit an event with the keys from a list of objects.', function () {
      app.on('option', function (keys) {
        keys.should.eql(['a', 'c', 'e']);
      });
      app.option({a: 'b'}, {c: 'd'}, {e: 'f'});
    });
  });
});
