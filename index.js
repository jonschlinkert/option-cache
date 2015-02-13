/*!
 * options-cache <https://github.com/jonschlinkert/options-cache>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var toArg = require('to-arg');
var typeOf = require('kind-of');
var merge = require('lodash')._.merge;

/**
 * Create a new instance of `Options`.
 *
 * ```js
 * var options = new Options();
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
  return (this.options[key] = value);
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

Options.prototype.isBoolean = function(key) {
  return typeof this.options[key] === 'boolean';
};

/**
 * Generate an array of command line args from
 * the given `keys` or all options.
 *
 * @param  {Array} `keys`
 * @return {Array}
 * @api public
 */

Options.prototype.flags = function(keys) {
  keys = keys || Object.keys(this.options);

  return keys.map(function (key) {
    return toArg(key, this.options[key]);
  }.bind(this));
};
