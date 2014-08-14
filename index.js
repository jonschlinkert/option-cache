/*!
 * options-cache <https://github.com/jonschlinkert/options-cache>
 *
 * Copyright (c) 2014 Jon Schlinkert, Brian Woodward, contributors.
 * Licensed under the MIT license.
 */

'use strict';

var _ = require('lodash');


/**
 * Initialize a new `Options` cache.
 *
 * **Example:**
 *
 * In your application:
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
 * App.prototype.foo = function(value) {
 *   this.enable(value);
 * };
 *
 * App.prototype.bar = function(value) {
 *   if (this.enabled(value)) {
 *     // do something
 *   }
 * };
 * ```
 *
 * @param {Object} `options` Initialize with default options.
 * @constructor
 * @api public
 */

var Options = module.exports = function(options) {
  this.options = options || {};
};


/**
 * Set or get an option.
 *
 * ```js
 * app.option('a', true)
 * app.option('a')
 * // => true
 * ```
 *
 * @param {String} `key`
 * @param {*} `value`
 * @return {Object} `Options`to enable chaining
 * @api public
 */

Options.prototype.option = function(key, value) {
  var args = [].slice.call(arguments);

  if (args.length === 1 && typeof key === 'string') {
    return this.options[key];
  }

  if (typeof key === 'object' && !Array.isArray(key)) {
    _.extend.apply(_, [this.options].concat(args));
    return this;
  }

  this.options[key] = value;
  return this;
};


/**
 * Assign `value` to `key` or return the value of `key`.
 *
 * ```js
 * app.set('foo', true)
 * ```
 *
 * @param {String} `key`
 * @param {*} `value` The value to set.
 * @return {Object} `Options`to enable chaining
 * @api public
 */

Options.prototype.set = function(key, value) {
  this.options[key] = value;
  return this;
};


/**
 * Return the stored value of `key`.
 *
 * ```js
 * app.set('foo', true)
 * app.get('foo')
 * //=> true
 * ```
 *
 * @param {String} `key`
 * @api public
 */

Options.prototype.get = function(key) {
  if (!key) {
    return this.options;
  }
  return this.options[key];
};


/**
 * Extend the `options` with the given object.
 * This method is chainable.
 *
 * **Example**
 *
 * ```js
 * options
 *   .extend({foo: 'bar'}, {baz: 'quux'});
 *   .extend({fez: 'bang'});
 * ```
 *
 * Or define the property to extend:
 *
 * ```js
 * options
 *   .extend('a', {foo: 'bar'}, {baz: 'quux'})
 *   .extend('b', {fez: 'bang'})
 *   .extend('a.b.c', {fez: 'bang'});
 * ```
 *
 * @chainable
 * @return {Cache} for chaining
 * @api public
 */

Options.prototype.extend = function() {
  var args = [].slice.call(arguments);
  if (typeof args[0] === 'string') {
    var obj = this.get(args[0]) || {};
    obj = _.extend.apply(_, [obj].concat(_.rest(args)));
    this.set(args[0], obj);
    return this;
  }
  _.extend.apply(_, [this.options].concat(args));
  return this;
};


/**
 * Check if `key` is enabled (truthy).
 *
 * ```js
 * app.enabled('foo')
 * // => false
 *
 * app.enable('foo')
 * app.enabled('foo')
 * // => true
 * ```
 *
 * @param {String} `key`
 * @return {Boolean}
 * @api public
 */

Options.prototype.enabled = function(key) {
  return !!this.get(key);
};


/**
 * Check if `key` is disabled (falsey).
 *
 * ```js
 * app.disabled('foo')
 * // => true
 *
 * app.enable('foo')
 * app.disabled('foo')
 * // => false
 * ```
 *
 * @param {String} `key`
 * @return {Boolean} Returns true if `key` is disabled.
 * @api public
 */

Options.prototype.disabled = function(key) {
  return !this.get(key);
};


/**
 * Enable `key`.
 *
 * **Example**
 *
 * ```js
 * app.enable('foo')
 * ```
 *
 * @param {String} `key`
 * @return {Object} `Options`to enable chaining
 * @api public
 */

Options.prototype.enable = function(key) {
  return this.set(key, true);
};


/**
 * Disable `key`.
 *
 * **Example**
 *
 * ```js
 * app.disable('foo')
 * ```
 *
 * @param {String} `key` The option to disable.
 * @return {Object} `Options`to enable chaining
 * @api public
 */

Options.prototype.disable = function(key) {
  return this.set(key, false);
};


/**
 * Remove `key` from the cache, or if no value is
 * specified the entire options is reset.
 *
 * **Example:**
 *
 * ```js
 * options.clear();
 * ```
 *
 * @chainable
 * @api public
 */

Options.prototype.clear = function(key) {
  if (key) {
    delete this.options[key];
  } else {
    this.options = {};
  }
};
