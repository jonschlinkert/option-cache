/*!
 * option-cache <https://github.com/jonschlinkert/option-cache>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var toArg = require('to-arg');
var typeOf = require('kind-of');
var merge = require('lodash')._.merge;

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

var Options = module.exports = function(options) {
  this.options = options || {};
};

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

Options.prototype.option = function(key, value) {
  if (arguments.length === 1 && typeOf(key) === 'string') {
    return this.options[key];
  }
  if (typeOf(key) === 'object') {
    var args = [].slice.call(arguments);
    merge.apply(merge, [this.options].concat(args));
    return this;
  }
  this.options[key] = value;
  return this;
};

/**
 * Enable `key`.
 *
 * **Example**
 *
 * ```js
 * app.enable('a');
 * ```
 *
 * @param {String} `key`
 * @return {Object} `Options`to enable chaining
 * @api public
 */

Options.prototype.enable = function(key) {
  return this.option(key, true);
};

/**
 * Disable `key`.
 *
 * **Example**
 *
 * ```js
 * app.disable('a');
 * ```
 *
 * @param {String} `key` The option to disable.
 * @return {Object} `Options`to enable chaining
 * @api public
 */

Options.prototype.disable = function(key) {
  return this.option(key, false);
};

/**
 * Check if `key` is enabled (truthy).
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
 * @param {String} `key`
 * @return {Boolean}
 * @api public
 */

Options.prototype.enabled = function(key) {
  return Boolean(this.options[key]);
};

/**
 * Check if `key` is disabled (falsey).
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
 * @param {String} `key`
 * @return {Boolean} Returns true if `key` is disabled.
 * @api public
 */

Options.prototype.disabled = function(key) {
  return !Boolean(this.options[key]);
};

/**
 * Returns true if the value of `key` is strictly `true`.
 *
 * ```js
 * app.option('a', 'b');
 * app.isTrue('a');
 * //=> false
 *
 * app.option('c', true);
 * app.isTrue('c');
 * //=> true
 * ```
 *
 * @param {String} `key`
 * @return {Boolean} Uses strict equality for comparison.
 * @api public
 */

Options.prototype.isTrue = function(key) {
  return this.options[key] === true;
};

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
 * ```
 *
 * @param {String} `key`
 * @return {Boolean} Uses strict equality for comparison.
 * @api public
 */

Options.prototype.isFalse = function(key) {
  return this.options[key] === false;
};

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

Options.prototype.isBoolean = function(key) {
  return typeof this.options[key] === 'boolean';
};

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
 * @param {String} `key`
 * @return {Boolean} True if `key` is is on options.
 * @api public
 */

Options.prototype.hasOption = function(key) {
  return this.options.hasOwnProperty(key);
};

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

Options.prototype.flags = function(keys) {
  keys = keys || Object.keys(this.options);

  return keys.map(function (key) {
    return toArg(key, this.options[key]);
  }.bind(this));
};
