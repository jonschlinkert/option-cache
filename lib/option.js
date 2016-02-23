'use strict';

var Emitter = require('component-emitter');
var utils = require('./utils');

function Option(cache) {
  this.cache = cache || {};
  utils.define(this, 'option', this.merge);
}

Emitter(Option.prototype);

Option.prototype.merge = function(key, value) {
  var type = utils.typeOf(key);

  if (type === 'array') {
    if (arguments.length > 1) {
      key = utils.toPath(key);

    } else if (typeof key[0] === 'string') {
      key = utils.toPath(arguments);
    }
  }

  if (typeof key === 'string') {
    if (arguments.length === 1) {
      return utils.get(this.cache, key);
    }
    this.set(key, value);
    return this;
  }

  if (type !== 'object' && type !== 'array') {
    var msg = 'expected option to be a string, object or array';
    throw new TypeError(msg);
  }

  var args = [].slice.call(arguments);
  if (type === 'array') {
    args = utils.flatten(args);
  }

  var len = args.length;
  var idx = -1;

  while (++idx < len) {
    var opt = args[idx];
    for (var key in opt) {
      this.set(key, opt[key]);
    }
  }

  return this;
};

Option.prototype.set = function(key, val) {
  if (arguments.length < 2) {
    return this.merge.apply(this, arguments);
  }

  if (Array.isArray(key)) {
    key = utils.toPath(key);
  }

  utils.set(this.cache, key, val);
  this.emit('set', key, val);
  return this;
};

Option.prototype.get = function(key) {
  if (Array.isArray(key)) {
    key = utils.toPath(key);
  }
  var val = utils.get(this.cache, key);
  this.emit('get', key, val);
  return val;
};

/**
 * Expose `Option`
 */

module.exports = Option;
