/*!
 * option-cache <https://github.com/jonschlinkert/option-cache>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var Emitter = require('component-emitter');
var typeOf = require('kind-of');

/**
 * Lazily required modules
 */

var lazy = require('lazy-cache')(require);
lazy('collection-visit', 'visit');
lazy('get-value', 'get');
lazy('set-value', 'set');
lazy('has-value', 'has');
lazy('to-flags', 'toFlags');

/**
 * Create a new instance of `Options`.
 *
 * ```js
 * var app = new Options();
 * ```
 *
 * @param {Object} `options` Initialize with default options.
 * @api public
 */

var Options = module.exports = function Options(options) {
  Emitter.call(this);
  this.options = options || {};
};

/**
 * Static method for mixing `Options` methods onto the
 * provided `object`.
 *
 * @param {Object} `object`
 * @return {Object}
 */

Options.mixin =function(object) {
  for (var key in Options.prototype) {
    object.prototype[key] = Options.prototype[key];
  }
  object.mixin = Options.mixin;
};

/**
 * `Options` prototype methods.
 */

Options.prototype = Emitter({
  constructor: Options,

  /**
   * Set or get an option.
   *
   * ```js
   * app.option('a', true);
   * app.option('a');
   * //=> true
   * ```
   *
   * @param {String} `key` The option name.
   * @param {*} `value` The value to set.
   * @return {*} Returns a `value` when only `key` is defined.
   * @api public
   */

  option: function(key, val) {
    if (typeOf(key) === 'string' && typeOf(val) === 'undefined') {
      if (key.indexOf('.') === -1) {
        return this.options[key];
      }
      return lazy.get(this.options, key);
    }

    if (typeOf(key) === 'object' || typeOf(key) === 'array') {
      return this.visit('option', [].slice.call(arguments));
    }

    lazy.set(this.options, key, val);
    this.emit('option', key, val);
    return this;
  },

  /**
   * Enable `key`.
   *
   * ```js
   * app.enable('a');
   * ```
   * @param {String} `key`
   * @return {Object} `Options`to enable chaining
   * @api public
   */

  enable: function(key) {
    this.option(key, true);
    return this;
  },

  /**
   * Disable `key`.
   *
   * ```js
   * app.disable('a');
   * ```
   *
   * @param {String} `key` The option to disable.
   * @return {Object} `Options`to enable chaining
   * @api public
   */

  disable: function(key) {
    this.option(key, false);
    return this;
  },

  /**
   * Check if `prop` is enabled (truthy).
   *
   * ```js
   * app.enabled('a');
   * //=> false
   *
   * app.enable('a');
   * app.enabled('a');
   * //=> true
   * ```
   *
   * @param {String} `prop`
   * @return {Boolean}
   * @api public
   */

  enabled: function(prop) {
    return Boolean(this.option(prop));
  },

  /**
   * Check if `prop` is disabled (falsey).
   *
   * ```js
   * app.disabled('a');
   * //=> true
   *
   * app.enable('a');
   * app.disabled('a');
   * //=> false
   * ```
   *
   * @param {String} `prop`
   * @return {Boolean} Returns true if `prop` is disabled.
   * @api public
   */

  disabled: function(prop) {
    return !Boolean(this.option(prop));
  },

  /**
   * Returns true if the value of `prop` is strictly `true`.
   *
   * ```js
   * app.option('a', 'b');
   * app.isTrue('a');
   * //=> false
   *
   * app.option('c', true);
   * app.isTrue('c');
   * //=> true
   *
   * app.option({a: {b: {c: true}}});
   * app.isTrue('a.b.c');
   * //=> true
   * ```
   *
   * @param {String} `prop`
   * @return {Boolean} Uses strict equality for comparison.
   * @api public
   */

  isTrue: function(prop) {
    return this.option(prop) === true;
  },

  /**
   * Returns true if the value of `key` is strictly `false`.
   *
   * ```js
   * app.option('a', null);
   * app.isFalse('a');
   * //=> false
   *
   * app.option('c', false);
   * app.isFalse('c');
   * //=> true
   *
   * app.option({a: {b: {c: false}}});
   * app.isFalse('a.b.c');
   * //=> true
   * ```
   *
   * @param {String} `prop`
   * @return {Boolean} Uses strict equality for comparison.
   * @api public
   */

  isFalse: function(prop) {
    return this.option(prop) === false;
  },

  /**
   * Return true if the value of key is either `true`
   * or `false`.
   *
   * ```js
   * app.option('a', 'b');
   * app.isBoolean('a');
   * //=> false
   *
   * app.option('c', true);
   * app.isBoolean('c');
   * //=> true
   * ```
   *
   * @param {String} `key`
   * @return {Boolean} True if `true` or `false`.
   * @api public
   */

  isBoolean: function(prop) {
    return typeof this.option(prop) === 'boolean';
  },

  /**
   * Return true if `options.hasOwnProperty(key)`
   *
   * ```js
   * app.hasOption('a');
   * //=> false
   * app.option('a', 'b');
   * app.hasOption('a');
   * //=> true
   * ```
   *
   * @param {String} `prop`
   * @return {Boolean} True if `prop` exists.
   * @api public
   */

  hasOption: function(prop) {
    if (prop.indexOf('.') === -1) {
      return this.options.hasOwnProperty(prop);
    }
    return lazy.has(this.options, prop);
  },

  /**
   * Generate an array of command line args from
   * the given `keys` or all options.
   *
   * ```js
   * // set some options
   * app.option('foo', 'bar');
   * app.option('abc', true);
   * app.option('xyz', 10);
   * app.option('one', false);
   *
   * // create command line args for all options
   * app.flags();
   * //=> ['--foo=bar', '--abc', '--xyz=10', '--no-one']
   *
   * // or specific options
   * app.flags(['foo', 'abc']);
   * //=> ['--foo=bar', '--abc']
   * ```
   *
   * @param  {Array} `keys`
   * @return {Array} Array of args
   * @api public
   */

  flags: function(keys) {
    keys = keys || Object.keys(this.options);
    return lazy.toFlags(this.options, keys);
  },

  /**
   * Map visit `method` over each object in the given array.
   *
   * @param  {String} `method`
   * @param  {Array} `arr`
   */

  visit: function(method, arr) {
    lazy.visit(this, method, arr);
    return this;
  }
});
