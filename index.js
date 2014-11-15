/*!
 * options-cache <https://github.com/jonschlinkert/options-cache>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var typeOf = require('kind-of');
var merge = require('lodash')._.merge;

/**
 * Create a new instance of `Options`.
 *
 * **Example:**
 *
 * ```js
 * var util = require('util');
 * var Options = require('options-cache');
 *
 * function App(options) {
 *   Options.call(this, options);
 * }
 * util.inherits(App, Options);
 *
 * App.prototype.a = function(value) {
 *   this.enable(value);
 * };
 *
 * App.prototype.b = function(value) {
 *   if (this.enabled(value)) {
 *     // do something
 *   }
 * };
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
  var args = [].slice.call(arguments);

  if (args.length === 1 && typeOf(key) === 'string') {
    return this.options[key];
  }

  if (typeOf(key) === 'object') {
    merge.apply(merge, [this.options].concat(args));
    return this;
  }

  this.options[key] = value;
  return this;
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

