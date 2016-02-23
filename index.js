/*!
 * option-cache <https://github.com/jonschlinkert/option-cache>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */

'use strict';

var Emitter = require('component-emitter');
var Option = require('./lib/option');
var utils = require('./lib/utils');

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

function Options(options) {
  if (!(this instanceof Options)) {
    return new Options(options);
  }
  option(this, options);
}

/**
 * Mixin emitter
 */

Emitter(Options.prototype);

/**
 * Set or get an option.
 *
 * ```js
 * app.option('a', true);
 * app.option('a');
 * //=> true
 * ```
 * @name .option
 * @emits `option` with `key` and `value`, or if an object is passed, an event is emitted for each key in the object.
 * @param {String} `key` The option name.
 * @param {*} `value` The value to set.
 * @return {*} Returns a `value` when only `key` is defined.
 * @api public
 */

function option(app, options) {
  app.options = app.options || {};
  var option = new Option(app.options);

  option.on('set', app.emit.bind(app, 'option'));
  utils.define(app, 'option', function() {
    return option.merge.apply(option, arguments);
  });

  app.option.__proto__ = option;
  if (options) {
    app.option(options || {});
  }
}

/**
 * Set option `key` with the given `value`.
 *
 * ```js
 * app.setOption('a', 'b');
 * // or
 * app.setOption({a: 'b'});
 * ```
 * @param {String} `key`
 * @param {any} `val`
 * @api public
 */

Options.prototype.setOption = function(key, val) {
  return this.option.set.apply(this.option, arguments);
};

/**
 * Get option `key`
 *
 * ```js
 * app.setOption('a', 'b');
 * var opt = app.getOption('a');
 * //=> 'b'
 * ```
 * @param {String} `key`
 * @param {any} `val`
 * @api public
 */

Options.prototype.getOption = function(key) {
  return this.option.get.apply(this.option, arguments);
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
 * @name .hasOption
 * @param {String} `prop`
 * @return {Boolean} True if `prop` exists.
 * @api public
 */

Options.prototype.hasOption = function(key) {
  if (typeof key === 'string' && key.indexOf('.') === -1) {
    return this.options.hasOwnProperty(key);
  }
  return utils.has(this.options, utils.toPath(arguments));
};

/**
 * Enable `key`.
 *
 * ```js
 * app.enable('a');
 * ```
 * @name .enable
 * @param {String} `key`
 * @return {Object} `Options`to enable chaining
 * @api public
 */

Options.prototype.enable = function(key) {
  this.option(key, true);
  return this;
};

/**
 * Disable `key`.
 *
 * ```js
 * app.disable('a');
 * ```
 * @name .disable
 * @param {String} `key` The option to disable.
 * @return {Object} `Options`to enable chaining
 * @api public
 */

Options.prototype.disable = function(key) {
  this.option(key, false);
  return this;
};

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
 * @name .enabled
 * @param {String} `prop`
 * @return {Boolean}
 * @api public
 */

Options.prototype.enabled = function(key) {
  return Boolean(this.option(utils.toPath(arguments)));
};

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
 * @name .disabled
 * @param {String} `prop`
 * @return {Boolean} Returns true if `prop` is disabled.
 * @api public
 */

Options.prototype.disabled = function(key) {
  return !Boolean(this.option(utils.toPath(arguments)));
};

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
 * @name .isTrue
 * @param {String} `prop`
 * @return {Boolean} Uses strict equality for comparison.
 * @api public
 */

Options.prototype.isTrue = function(key) {
  return this.option(utils.toPath(arguments)) === true;
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
 *
 * app.option({a: {b: {c: false}}});
 * app.isFalse('a.b.c');
 * //=> true
 * ```
 * @name .isFalse
 * @param {String} `prop`
 * @return {Boolean} Uses strict equality for comparison.
 * @api public
 */

Options.prototype.isFalse = function(key) {
  return this.option(utils.toPath(arguments)) === false;
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
 * @name .isBoolean
 * @param {String} `key`
 * @return {Boolean} True if `true` or `false`.
 * @api public
 */

Options.prototype.isBoolean = function(key) {
  return typeof this.option(utils.toPath(arguments)) === 'boolean';
};

/**
 * Visit `method` over each object in the given collection.
 *
 * @param  {String} `method`
 * @param  {Array|Object} `value`
 */

Options.prototype.visit = function(method, collection) {
  utils.visit(this, method, collection);
  return this;
};

/**
 * Expose `Options`
 */

module.exports = Options;
