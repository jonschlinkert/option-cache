/*!
 * option-cache <https://github.com/jonschlinkert/option-cache>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var util = require('util');
var assert = require('assert');
var should = require('should');
var Options = require('..');

describe('new Options()', function () {
  it('should load default options from the constructor.', function () {
    var app = new Options();
    app.option('a', 'b');
    app.option('c', 'd');
    app.option('e', 'f');
    app.options.should.have.properties(['a', 'c', 'e']);
    app.options.should.have.property('a', 'b');
    app.options.should.have.property('c', 'd');
    app.options.should.have.property('e', 'f');
  });

  it('should inherit `Options`', function () {
    function App(options) {
      Options.call(this, options);
    }
    util.inherits(App, Options);
    var app = new App();
    assert.equal(app instanceof Options, true);
    assert.equal(App.super_ === Options, true);
    app.option('a', 'b');
    app.option('c', 'd');
    app.option('e', 'f');
    app.options.should.have.properties(['a', 'c', 'e']);
    app.options.should.have.property('a', 'b');
    app.options.should.have.property('c', 'd');
    app.options.should.have.property('e', 'f');
  });

  it('should mix option-cache properties onto App', function () {
    function App(options) {
      Options.call(this, options);
    }
    Options.mixin(App);
    var app = new App();
    assert.equal(app instanceof Options, false);
    assert.equal(App.super_ === Options, false);
    app.option('a', 'b');
    app.option('c', 'd');
    app.option('e', 'f');
    app.options.should.have.properties(['a', 'c', 'e']);
    app.options.should.have.property('a', 'b');
    app.options.should.have.property('c', 'd');
    app.options.should.have.property('e', 'f');
  });
});
