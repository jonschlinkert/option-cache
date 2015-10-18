'use strict';

require('mocha');
var assert = require('assert');
var Options = require('..');
var app;

describe('#hasOption', function () {
  beforeEach(function() {
    app = new Options();
  });

  describe('#disabled()', function () {
    it('should return false if an option does not exist', function () {
      assert(!app.hasOption('a'));
    });

    it('should return true if an option exists', function () {
      app.option('a', 'b');
      assert(app.hasOption('a'));
    });

    it('should return true when an option is falsey', function () {
      app.option('a', false);
      app.option('b', null);
      assert(app.hasOption('a'));
      assert(app.hasOption('b'));
    });

    it('should return true if a nested option exists', function () {
      app.option('a.b.c', 'd');
      assert(app.options.a.b.c === 'd');
      assert(app.hasOption('a.b.c'));
    });

    it('should return false if a nested option does not exist', function () {
      app.option('a', 'b');
      assert(!app.hasOption('a.b.c'));
    });
  });
});
