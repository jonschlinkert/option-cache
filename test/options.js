/*!
 * options-cache <https://github.com/jonschlinkert/options-cache>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var util = require('util');
var assert = require('assert');
var should = require('should');
var Options = require('..');

describe('new Options()', function () {
  it('should load default options from the constructor.', function () {
    var app = new Options({
      a: 'b',
      c: 'd',
      e: 'f'
    });
    app.options.should.have.properties(['a', 'c', 'e']);
    app.options.should.have.property('a', 'b');
    app.options.should.have.property('c', 'd');
    app.options.should.have.property('e', 'f');
  });

  it('should inherit `Options`', function () {
    function MyApp(options) {
      Options.call(this, options);
    }
    util.inherits(MyApp, Options);
    var myApp = new MyApp({
      a: 'b',
      c: 'd',
      e: 'f'
    });
    (myApp instanceof Options).should.be.true;
    (MyApp.super_ === Options).should.be.true;
    myApp.options.should.have.properties(['a', 'c', 'e']);
    myApp.options.should.have.property('a', 'b');
    myApp.options.should.have.property('c', 'd');
    myApp.options.should.have.property('e', 'f');
  });
});
